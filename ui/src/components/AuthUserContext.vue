<template>
  <div>
    {{ token }}
    <slot name="authorized" v-bind="{user,token}"></slot>
    <slot name="authorized" v-bind="{user,token}"></slot>
  </div>
</template>

<script>
import {UserApi, Configuration} from "@plus/auth-client-axios-js"

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
      token: null
    }
  },
  methods: {
    initApi() {
      let config = new Configuration({
        basePath: this.apiEndpoint
      })
      this.userApi = new UserApi(config)
    },
    onTokenUpdate(token) {
      console.log(token)
      this.token = token
    }
  },
  mounted() {
    this.initApi()

    // this.onTokenUpdate(this.$q.localStorage.getItem("token"))
    // console.log();
    this.$root.$on = console
    // this.$root.$emit
    this.$root.$emit("onTokenUpdate", this.$q.localStorage.getItem("token"))
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