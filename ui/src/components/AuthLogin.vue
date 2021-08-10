<template>
  <div class="flex flex-center text-center">
    <div v-if="error == null">
      <slot v-if="loading">
        <div>
          <div>
            <q-spinner-clock :color="color" :size="size"/>
          </div>
          <div class="text-h5 q-pa-sm">{{ $q.lang.table.loading }}</div>
        </div>
      </slot>

      <slot v-else name="success">
        <div>
          <div>
            <q-spinner-clock :color="color" :size="size"/>
          </div>
          <div class="text-h5 q-pa-sm">{{ $q.lang.table.loading }}</div>
        </div>
      </slot>
    </div>
    <slot v-else name="error" v-bind="{ error }">
      <div>
        <div>
          <q-icon name="error" :size="size" :color="errorColor"/>
        </div>
        <div>
          <div class="text-h5">
            {{ error.message ? error.message : "Error" }}
          </div>
          <div class="text-caption">
            {{ error.details ? error.details : "" }}
          </div>
        </div>
        <div class="q-gutter-sm">
          <q-btn
              dense
              round
              flat
              icon="keyboard_arrow_left"
              color="black"
              @click="$router.back"
          />
          <q-btn
              dense
              round
              flat
              icon="home"
              color="black"
              :disable="!index"
              @click="()=>$router.push(index)"
          />
          <q-btn
              dense
              round
              flat
              icon="help"
              color="black"
              :disable="!help"
              @click="()=>$router.push(help)"
          />
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import qs from "qs";
import {v1} from "uuid";
import ServiceException from "./ServiceException";
import bus from "./AuthEventBus";

export default {
  name: "AuthLogin",
  props: {
    authorizeUri: {
      type: String,
      default() {
        return "https://accounts.dustlight.cn/authorize"
      }
    },
    redirectUri: String,
    scope: String,
    clientId: String,
    index: Object,
    help: Object,
    color: {
      type: String,
      default() {
        return "primary";
      },
    },
    size: {
      type: String,
      default() {
        return "5em";
      },
    },
    errorColor: {
      type: String,
      default() {
        return "negative";
      },
    },

  },
  data() {
    return {
      response: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    validateState(val) {
      let state = this.$q.sessionStorage.getItem("state");
      if (state == null || val == null) return false;
      return val == state;
    },
    generateState() {
      let uuid = v1();
      this.$q.sessionStorage.set("state", uuid);
      return uuid;
    },
    removeState() {
      this.$q.sessionStorage.remove("state");
    },
    connect() {
      let query = qs.stringify(
          {
            scope: this.scope,
            redirect_uri: this.redirectUri
                ? location.origin + this.redirectUri
                : location.href,
            client_id: this.clientId,
            response_type: "token",
            state: this.generateState(),
          },
          null,
          null,
          {}
      );
      location.replace(this.authorizeUri + "?" + query);
    },
    callback(response) {
      if (this.validateState(response.state)) {
        if (response.access_token && response.expires_in)
          this.onConnectSuccess(response);
        else
          this.onConnectFail(
              new ServiceException(
                  0,
                  response.error || "Login failed",
                  response.error_description || "Token invalid"
              )
          );
      } else {
        // this.onConnectFail(
        //     new ServiceException(0, "Login failed", "Uninitialized")
        // );
        this.connect()
      }
    },
    onConnectSuccess(token) {
      this.loading = false;
      this.removeState();
      this.$q.localStorage.set("token", token);
      bus.emit("onTokenUpdate", token)
      let redirect = this.$route.query.redirect_uri;
      this.$router.replace(redirect ? {path: redirect} : this.index);
    },
    onConnectFail(e) {
      bus.emit("onTokenUpdate", null)
      this.loading = false;
      this.error = e;
    },
  },
  mounted() {
    this.loading = true;
    let response =
        this.$route.hash != null && this.$route.hash.trim().length > 1
            ? qs.parse(this.$route.hash.substring(1))
            : null;
    if (response != null) {
      this.response = response;
      this.callback(response);
    } else {
      this.connect();
    }
  },
};
</script>

<style scoped></style>
