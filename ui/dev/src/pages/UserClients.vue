<template>
  <!-- 用户以及 Token 上下文  -->
  <auth-user-context v-slot="{user,token}" apiEndpoint="http://api.wgv">

    <!-- 用户应用列表  -->
    <user-client-list :user="user" :token="token" apiEndpoint="http://api.wgv" :pageSize="5" @onSelected="onSelected">
    </user-client-list>

  </auth-user-context>
</template>

<script>
import {UserClientSelector} from 'ui'

export default {
  name: "UserClients",
  data() {
    return {
      client: null
    }
  },
  methods: {
    // 选择事件回调
    onSelected(client) {
      this.$q.notify({
        position: "center",
        group: "test",
        message: "<pre>" + JSON.stringify(client, null, '  ') + "</pre>",
        html: true
      })
    }
  }
}
</script>

<style scoped>

</style>
