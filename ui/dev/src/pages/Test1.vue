<template>
  <q-page padding>
    <q-btn>
      Hello World
      <q-menu>
        <q-list>
          <q-item>
            😄Good Luck⭐
          </q-item>
          <q-item v-ripple clickable v-close-popup>
            Close
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
