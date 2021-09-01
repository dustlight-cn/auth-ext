<template>
  <!-- 用户以及 Token 上下文  -->
  <auth-user-context
    v-slot="{user,token}"
    apiEndpoint="http://api.wgv">
<pre>用户对象：{{ user }}

Token对象：{{ token }}
</pre>
  </auth-user-context>
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
