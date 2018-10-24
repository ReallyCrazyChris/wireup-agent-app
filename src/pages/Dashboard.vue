<template>
  <f7-page name="dashboard">
    <connectioncanvas>
      <vue-draggable-resizable v-for="(shadowmodel, index) in shadowmodels" :key="index"
        v-on:dragging="ondrag"
        :parent="true"
        :resizable="false"
        drag-handle=".productheader">
        <div class="shadowitem"  >
          <product :product="shadowmodel" :showconnectors="true"/>
        </div>
      </vue-draggable-resizable>
    </connectioncanvas>
    <picker/>
  </f7-page>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Picker from '../components/Pickers/Picker.vue'
import Product from '../components/Product'
import ConnectionCanvas from '../components/Connections/ConnectionCanvas'

export default {
  computed: {
    ...mapGetters([
      'shadowmodels'
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
    product: Product,
    connectioncanvas: ConnectionCanvas,
    picker: Picker
  }
}
</script>

<style>

.page {
  background: url("../assets/wireup1920x700.jpg") no-repeat top left fixed !important;
  background-size: cover !important;
}

.shadowitem {
  padding: 25px;
  width: 100%;
}
</style>
