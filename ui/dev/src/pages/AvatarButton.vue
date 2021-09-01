<template>
  <div>
    <!-- 登陆按钮 | 头像框   （取决于是否登陆） -->
    <auth-avatar-button
      :loginPage="{path:'login',query:{redirect_uri:$route.fullPath}}"
      apiEndpoint="http://api.wgv">
      <q-item v-ripple clickable v-close-popup @click="onCustomButtonClick">
        <q-item-section class="text-center">
          自定义按钮
        </q-item-section>
      </q-item>
    </auth-avatar-button>

    <q-separator class="q-mt-md q-mb-md"/>

    <!-- 结合 Context 组件使用 -->
    <auth-user-context v-slot="{user}" apiEndpoint='http://api.wgv'>
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>
              用户名
            </q-item-label>
            <q-item-label caption>
              {{ user.username }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>
              头像
            </q-item-label>
            <q-item-label>
              <auth-avatar :user="user"/>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>
              邮箱
            </q-item-label>
            <q-item-label caption>
              {{ user.email }}
            </q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </auth-user-context>
  </div>
</template>

<script>
export default {
  name: "UserContext",
  methods: {
    onCustomButtonClick() {
      this.$q.notify({
        message: "自定按钮被点击"
      })
    }
  }
}
</script>

<style scoped>

</style>
