<template>
  <q-page padding>

    <!--      authorizeUri="http://accounts.wgv/authorize"-->
    <auth-login
      authorizeUri="http://accounts.wgv/authorize"
      clientId="86c3e34e2030000"
      :index="{
        path: 'test1',
      }"
      :help="{
      path:'/help'
      }"
    >
    </auth-login>
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
