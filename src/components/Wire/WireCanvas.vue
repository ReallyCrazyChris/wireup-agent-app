<template>
    <div class="wirecanvas" ref="wirecanvas">
        <svg  class="svgcanvas" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" >
          <connection v-if="connections" v-for="(connection, index) in connections" :connection="connection" :wirecanvas="$refs.wirecanvas" :key="index" />
        </svg>
        <slot></slot>
    </div>
</template>

<script>

import Connection from './Connection.vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'connections'
    ])
  },
  components: {
    connection: Connection
  }
}
</script>

<style>
.wirecanvas {
  display: inline-block;
  position:relative;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
}
.svgcanvas {
  display: inline-block;
  position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
}
</style>
