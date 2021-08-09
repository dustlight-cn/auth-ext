<template>
  <div>
    <slot v-if="token == null" name="unauthorized">未登录</slot>
    <div v-else>
      <slot v-if="(promise != null) && error == null" name="loading">加载中</slot>
      <div v-else>
        <slot v-if="error != null" name="error" v-bind="error">错误：{{ error }}</slot>
        <slot v-else name="authorized" v-bind="user">{{ user }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import {UserApi, Configuration} from "@plus/auth-client-axios-js"
import bus from "./AuthEventBus"

let last = null
let promise = null;

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
      error: null
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
      this.loadUser()
    },
    loadUser() {
      if (promise == null)
        promise = this.userApi.getTokenUser()
            .then(res => {
              this.$q.localStorage.set("user", res.data)
              bus.emit("onUserUpdate", res.data)
            })
            .catch(e => {
              bus.emit("onUserError", e)
            })
            .finally(() => {
              promise = null
            });
    },
    onUserUpdate(user) {
      console.log(user)
      this.user = user
    },
    onUserError(error) {
      console.error(error)
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
  watch: {
    apiEndpoint() {
      this.initApi()
    }
  }
}
</script>

<style scoped>

</style>