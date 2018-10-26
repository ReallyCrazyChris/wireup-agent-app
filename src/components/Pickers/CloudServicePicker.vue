<template>
    <div class="cloudservices">
      <div class="cloudservice" v-for="(item, index) in cloudservices" :key="index">
          <productheader
            :imageurl="item.imageurl"
            :company="item.type"
            :name="item.name"
            :description="item.description"
          >
          <div class="addbutton" slot="top" @click="addbrick([item.type])">
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
      'bricks'
    ])
  },
  methods: {
    ...mapActions([
      'addbrick'
    ])
  },
  components: {
    productheader: ProductHeader
  }
}
</script>

<style scoped>

.cloudservices {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, 250px);
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.cloudservice {
  padding: 10px;
  width: 100%;
}

.addbutton {
  text-align: center;
  width: 2em;
  cursor: pointer;
}

</style>
