<template>
  <auth-user-context :api-endpoint="apiEndpoint">
    <template v-slot:default="{user}">
      <q-btn flat round>
        <auth-avatar :user="user"/>
        <q-menu v-if="user && user.uid">
          <div class="text-center q-pa-md">
            <q-btn class="q-ma-sm" rounded dense flat>
              <auth-avatar :size="avatarSize" :user="user" :to="avatarPage"/>
            </q-btn>
            <div class="text-bold">{{ user.nickname && user.nickname.trim() ? user.nickname : user.username }}</div>
            <div class="text-caption">{{ user.email }}</div>
          </div>
          <q-list style="min-width: 150px;">
            <q-separator/>
            <slot></slot>
            <q-item @click="signOut" v-ripple clickable v-close-popup>
              <q-item-section class="text-center">
                {{ text.signOut }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>

    <template v-slot:unauthorized>
      <q-btn rounded :color="color"
             :label="text.signIn"
             replace
             :disable="!loginPage"
             :to="loginPage"/>
    </template>
  </auth-user-context>
</template>

<script>
import bus from './common/AuthEventBus'
import AuthUserContext from "./AuthUserContext";
import AuthAvatar from "./AuthAvatar";
import {TokenApi, Configuration} from "@plus/auth-client-axios-js"

export default {
  name: "AuthAvatarButton",
  components: {
    AuthAvatar,
    AuthUserContext,
  },
  props: {
    color: {
      type: String,
      default() {
        return "primary"
      }
    },
    avatarSize: {
      type: Number,
      default() {
        return 50;
      }
    },
    apiEndpoint: {
      type: String,
      default() {
        return process.env.auth.config.apiEndpoint || "https://api.dustlight.cn"
      }
    },
    loginPage: Object,
    avatarPage: Object,
    text: {
      type: Object,
      default() {
        return {
          signIn: "Sign In",
          signOut: "Sign Out",
          signOutSuccess: "Successfully signed out"
        }
      }
    }
  },
  data() {
    return {
      tokenApi: null
    }
  },
  methods: {
    signOut() {
      this.tokenApi.deleteToken()
          .then(() => {
            this.$q.notify({
              message: this.text.signOutSuccess,
              type: 'info'
            })
          })
          .finally(() => {
            this.$q.localStorage.remove("user");
            this.$q.localStorage.remove("token");
            bus.emit("onTokenUpdate", null)
            bus.emit("onUserUpdate", null)
          })
    },
    initApi() {
      let config = new Configuration({
        basePath: this.apiEndpoint,
        accessToken: () => {
          let token = this.$q.localStorage.getItem("token")
          if (token == null)
            return null
          return token["access_token"]
        }
      })
      this.tokenApi = new TokenApi(config)
    }
  },
  mounted() {
    this.initApi()
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
