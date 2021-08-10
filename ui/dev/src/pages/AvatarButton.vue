<template>
  <div>
    <auth-avatar-button
      :loginPage="{path:'login',query:{redirect_uri:$route.fullPath}}"
      apiEndpoint="http://api.wgv">
    </auth-avatar-button>
    <auth-user-context apiEndpoint='http://api.wgv'/>
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
