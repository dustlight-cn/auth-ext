<template>
  <div>
    <slot name="error" v-if="error">
      <div class="text-center">
        {{ error.message }}
      </div>
    </slot>
    <slot v-else>
      <div class="q-ma-sm">
        <q-input :color="color"
                 filled
                 v-model="q"
                 dense
                 style="max-width: 599px;margin: 0 auto"
                 :placeholder="$q.lang.label.search"
                 debounce="500"
                 clearable>
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
        </q-input>
      </div>
      <q-separator/>
      <slot v-if="loading" name="loading">
        <div class="text-center">
          <transition
              v-for="index in pageSize"
              :key="index"
              appear-active-class="Fade In"
              leave-active-class="Fade Out">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-skeleton size="32px" type="QBtn"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" width="2em"/>
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="4em"/>
                </q-item-label>
              </q-item-section>
            </q-item>
          </transition>
        </div>
      </slot>
      <q-list v-else-if="clients && clients.length > 0">
        <transition
            v-for="client in clients"
            :key="client.cid"
            appear-active-class="Fade In"
            leave-active-class="Fade Out">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <auth-client-logo :client="client"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ client.name }}
              </q-item-label>
              <q-item-label caption>
                {{ client.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </transition>
      </q-list>
      <slot v-else name="noResults">
        <no-results/>
      </slot>

      <div class="flex flex-center">
        <q-pagination
            v-model="page"
            :max="Math.ceil(count/pageSize)"
            input
            :color="color"
        />
      </div>
    </slot>
  </div>
</template>

<script>
import {Configuration, ClientsApi} from "@plus/auth-client-axios-js"
import NoResults from "./NoResults";
import AuthClientLogo from "./AuthClientLogo";

export default {
  name: "UserClientList",
  components: {AuthClientLogo, NoResults},
  props: {
    user: Object,
    token: Object,
    color: {
      type: String,
      default() {
        return "primary"
      }
    },
    apiEndpoint: {
      type: String,
      default() {
        return "https://api.dustlight.cn"
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 5
      }
    }
  },
  data() {
    return {
      loading: false,
      clientsApi: null,
      q: "",
      clients: [],
      error: null,
      count: 0,
      page: 1
    }
  },
  methods: {
    load() {
      if (this.loading) return;
      this.loading = true;
      this.clientsApi.getUserClients(this.user.uid, this.q, null, (this.page - 1) * this.pageSize, this.pageSize)
          .then(res => {
            this.count = res.data.count
            this.clients = res.data.data
          })
          .catch(e => {
            this.error = e
          })
          .finally(() => this.loading = false)
    }
  },
  watch: {
    "user.uid"() {
      this.page = 1
      this.load()
    },
    "q"() {
      this.page = 1
      this.load()
    },
    "page"() {
      this.load()
    }
  },
  mounted() {
    let cfg = new Configuration({
      basePath: this.apiEndpoint,
      accessToken: () => this.token instanceof Promise ? this.token : (this.token instanceof Object ? this.token.access_token : this.token)
    })
    this.clientsApi = new ClientsApi(cfg)
    this.load()
  }
}
</script>

<style scoped>

</style>