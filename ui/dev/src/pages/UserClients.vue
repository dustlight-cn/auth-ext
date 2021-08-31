<template>
  <!-- 用户以及 Token 上下文  -->
  <auth-user-context v-slot="{user,token}" apiEndpoint="http://api.wgv">

    <!-- 用户应用列表  -->
    <user-client-list :user="user" :token="token" apiEndpoint="http://api.wgv" :pageSize="2">
    </user-client-list>
  </auth-user-context>
</template>

<script>
export default {
  name: "UserClients"
}
</script>

<style scoped>

</style>
