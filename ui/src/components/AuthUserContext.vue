<template>
  <div>
    <slot v-if="token == null" name="unauthorized">
      <q-icon name="error"/>
      <span>Unauthorized</span>
    </slot>
    <div v-else>
      <slot v-if="user == null && error == null" name="loading">
        <div>
          <div>
            <q-spinner-tail color="primary" size="32px"/>
          </div>
        </div>
      </slot>
      <div v-else>
        <slot v-if="error != null" name="error" v-bind="error">
          {{ error }}
        </slot>
        <slot v-else :token="token" :user="user">{{ user }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import {UserApi, Configuration} from "@plus/auth-client-axios-js"
import bus from "./AuthEventBus"

let last = null
let _promise = null;

export default {
  name: "AuthUserContext",
  props: {
    apiEndpoint: {
      type: String,
      default() {
        return "http://api.dustlight.cn"
      }
    }
  },
  data() {
    return {
      userApi: null,
      token: null,
      user: null,
      error: null,
      loading: false
    }
  },
  methods: {
    initApi() {
      let config = new Configuration({
        basePath: this.apiEndpoint,
        accessToken: () => this.token.access_token
      })
      this.userApi = new UserApi(config)
    },
    onTokenUpdate(token) {
      this.token = token
      if (token != null)
        this.loadUser()
    },
    loadUser() {
      if (_promise == null) {
        last = new Date().getTime()
        _promise = this.userApi.getTokenUser()
            .then(res => {
              this.$q.localStorage.set("user", res.data)
              bus.emit("onUserUpdate", res.data)
            })
            .catch(e => {
              if (e.response.status == 403) {
                if (e.response.data && e.response.data.code == 1) {
                  this.$q.localStorage.remove("user")
                  this.$q.localStorage.remove("token")
                  bus.emit("onUserUpdate", null)
                  bus.emit("onTokenUpdate", null)
                  return
                }
              }
              bus.emit("onUserError", e)
            })
            .finally(() => {
              _promise = null
            });
      } else {
        this.onUserUpdate(this.$q.localStorage.getItem("user"))
      }
    },
    onUserUpdate(user) {
      this.user = user
    },
    onUserError(error) {
      this.error = error
    }
  },
  mounted() {
    this.initApi()
    bus.on("onTokenUpdate", this.onTokenUpdate)
    bus.on("onUserUpdate", this.onUserUpdate)
    bus.on("onUserError", this.onUserError)
    this.onTokenUpdate(this.$q.localStorage.getItem("token"))
  },
  computed: {},
  watch: {
    apiEndpoint() {
      this.initApi()
    }
  }
}
</script>

<style scoped>

</style>