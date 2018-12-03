<template>
    <div class="bricks">
      <div class="brick" v-for="(item, index) in bricks" :key="index" @click="addbrick([item.type])">
          <productheader
            :imageurl="item.imageurl"
            :company="item.type"
            :name="item.name"
            :description="item.description"
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

.bricks {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, 250px);
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.brick {
  padding: 10px;
  width: 100%;
  cursor: pointer;
}

.addbutton {
  text-align: center;
  width: 2em;
  cursor: pointer;
}

</style>
