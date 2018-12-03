<template>
    <div class="discovered">
      <div class="discovereditem" v-for="(item, nodeid) in discovered" :key="nodeid" @click="doaction(['shadow', nodeid])">
          <productheader
            :imageurl="item[2]"
            :company="item[3]"
            :name="item[4]"
            :description="item[5]"
          >
          </productheader>
      </div>
    </div>
</template>

<script>

import ProductHeader from './ProductHeader.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'discovered'
    ])
  },
  methods: {
    ...mapActions([
      'doaction'
    ])
  },
  components: {
    productheader: ProductHeader
  }
}
</script>

<style scoped>

.discovered {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, 250px);
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.discovereditem {
  padding: 10px;
  width: 100%;
  cursor:pointer;
}

</style>
