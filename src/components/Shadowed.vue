<template>
  <wirecanvas>
    <vue-draggable-resizable
      v-on:dragging="ondrag"
      :parent="true"
      :resizable="false"
      drag-handle=".productheader">
      <div class="shadowitem" v-for="(shadow, index) in shadowed" :key="index">
        <product :product="shadow['1']" :nodeid="index" :modelid="'1'"/>
      </div>
    </vue-draggable-resizable>
  </wirecanvas>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import shadow from '@/components/Shadow'
import wirecanvas from '@/components/Wire/WireCanvas'

export default {
  computed: {
    ...mapGetters([
      'shadowed'
    ])
  },
  methods: {
    ...mapActions([
      'renderconnections'
    ]),
    ondrag: function (x, y) {
      this.renderconnections()
    }
  },
  components: {
    product: shadow,
    wirecanvas: wirecanvas
  }
}
</script>

<style>

.shadowitem {
  padding: 25px;
  width: 100%;
}
</style>
