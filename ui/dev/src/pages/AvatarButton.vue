<template>
  <div>
    <auth-avatar-button
      :loginPage="{path:'login',query:{redirect_uri:$route.fullPath}}"
      apiEndpoint="http://api.wgv">
    </auth-avatar-button>
    <auth-user-context v-slot="{user}" apiEndpoint='http://api.wgv'>
      用户名：{{ user.username }}
    </auth-user-context>
  </div>
</template>

<script>
export default {
  name: "UserContext",
  mounted() {

  }
}
</script>

<style scoped>

</style>
