<template>
  <div style="user-select: none;">
    <q-avatar rounded v-if="error || client != null && client.cid != null && client.logo == null && src == null"
              color="grey"
              text-color="white"
              :size="computedSize">
      {{ firstChar }}
    </q-avatar>
    <q-avatar rounded v-else :size="computedSize">
      <q-img :width="computedSize" :height="computedSize" v-if="client && client.logo || src" :src="src || client.logo"
             @load="onLoad" @error="onError">
        <template v-slot:loading>
          <q-skeleton square type="QAvatar" :size="computedSize"/>
        </template>
      </q-img>
    </q-avatar>
  </div>
</template>

<script>
export default {
  name: 'AuthClientLogo',
  props: {
    size: Number | String,
    client: Object,
    src: String
  },
  data() {
    return {
      error: false,
      loading: true
    }
  },
  computed: {
    computedSize() {
      return (this.size ? this.size : 32) + 'px'
    },
    firstChar() {
      return this.client.name.toUpperCase()[0];
    }
  },
  methods: {
    onError() {
      this.error = true;
    },
    onLoad() {
      this.loading = false;
    }
  },
  watch: {
    src() {
      this.error = false
      this.loading = true
    },
    "client.logo"() {
      this.error = false
      this.loading = true
    }
  }
}
</script>
