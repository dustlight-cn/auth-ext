<template>
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
</template>

<script>
export default {
  name: "Error",
  props: {
    error: Object,
    index: {
      type: Object,
      default() {
        return {
          name: 'index'
        }
      }
    },
    help: Object,
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
    }
  }
}
</script>

<style scoped>

</style>