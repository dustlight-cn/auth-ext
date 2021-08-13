<template>
  <div style="user-select: none;">
    <q-avatar v-if="error || user != null && user.uid != null && user.avatar == null && src==null" color="grey"
              text-color="white"
              :size="computedSize">
      {{ firstChar }}
    </q-avatar>
    <q-avatar class="user-avatar" v-else :size="computedSize">
      <q-img :width="computedSize" :height="computedSize" v-if="user && user.avatar || src" :src="src || user.avatar"
             @load="onLoad"
             @error="onError">
        <template v-slot:loading>
          <q-skeleton type="QAvatar" :size="computedSize"/>
        </template>
      </q-img>
    </q-avatar>
  </div>
</template>

<script>
import bus from "./AuthEventBus";

export default {
  name: 'AuthAvatar',
  props: {
    size: Number | String,
    user: Object,
    src: String,
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
      return this.user.nickname ? this.user.nickname.toUpperCase()[0] : this.user.username.toUpperCase()[0]
    }
  },
  methods: {

    onError() {
      this.error = true
    },
    onLoad() {
      this.loading = false
    }
  },
  watch: {
    src() {
      this.error = false
      this.loading = true
    },
    "user.avatar"() {
      this.error = false
      this.loading = true
    }
  },
  mounted() {
    bus.on('AvatarUpdate', (t) => {
      this.error = false
      this.loading = true
    })
  }
}
</script>
