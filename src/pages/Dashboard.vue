<template>
  <f7-page name="dashboard">
    <connectioncanvas>
      <vue-draggable-resizable v-for="(model, index) in shadowmodels" :key="index"
        v-on:dragging="ondrag"
        :parent="true"
        :resizable="false"
        drag-handle=".shadowitem">
        <div class="shadowitem">
          <component
          :is="model.clazz"
          :model="model"
          :showconnectors="true"
          />
        </div>
      </vue-draggable-resizable>
    </connectioncanvas>
    <picker/>
  </f7-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Picker from '../components/Pickers/Picker.vue'
import Product from '../components/Blocks/Product'
import Brick from '../components/Blocks/Brick'
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
    Product: Product,
    Brick: Brick,
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
