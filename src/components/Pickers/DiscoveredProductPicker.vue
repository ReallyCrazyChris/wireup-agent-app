<template>
    <div class="discovered">
      <div class="discovereditem" v-for="(item, index) in discovered" :key="index" @click="shadow( index )">
          <productheader
            :imageurl="item[2]"
            :company="item[3]"
            :name="item[4]"
            :description="item[5]"
          >
          <div class="addbutton" slot="top" @click="unshadow(nodeid)">
            <f7-icon md="material:add" color="white"/>
          </div>
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
      'shadow'
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
}

.addbutton {
  text-align: center;
  width: 2em;
  cursor: pointer;
}

</style>
