<template>
  <div class="wireable">
    <div :class="targetclass"
         @click="selecttarget(uri)"
         :ref="targetid"
    />
    <div class="component">
       <slot>Error Wireable needs a component</slot>
    </div>
    <div :class="sourceclass"
         @click="selectsource(uri)"
         :ref="sourceid"
    />
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['nodeid', 'modelid', 'propname'],
  computed: {
    ...mapGetters([
      'selectedsource',
      'selectedtarget'
    ]),
    uri: function () {
      return [this.nodeid, this.modelid, this.propname].join('/')
    },
    sourceid: function () {
      return [this.nodeid, this.modelid, this.propname, 's'].join('-')
    },
    targetid: function () {
      return [this.nodeid, this.modelid, this.propname, 't'].join('-')
    },
    sourceclass: function () {
      if (this.selectedsource === this.uri) { return 'selectedsource' }
      return 'source'
    },
    targetclass: function () {
      if (this.selectedtarget === this.uri) { return 'selectedtarget' }
      return 'target'
    }
  },
  methods: {
    ...mapActions([
      'selectsource',
      'selecttarget',
      'addsource',
      'addtarget'
    ])
  },
  mounted: function () {
    this.addsource({
      uri: this.uri,
      id: this.sourceid,
      el: this.$refs[this.sourceid]
    })
    this.addtarget({
      uri: this.uri,
      id: this.targetid,
      el: this.$refs[this.targetid]
    })
  }
}
</script>

<style scoped>

.wireable {
  display: grid;
  grid-template-columns: 20px 210px 20px   ;
  grid-template-rows: auto;

}

.target {
  grid-column: 1;
  grid-row: 1;
  width: 1em;
  height: 1em;
  justify-self: left;
  align-self: center;
  background-color: lightgrey;
  border-radius: 10px;
}

.selectedtarget {
  grid-column: 1;
  grid-row: 1;
  width: 1em;
  height: 1em;
  justify-self: left;
  align-self: center;
  background-color: lightgreen;
  border-radius: 10px;
}

.component {
  grid-column: 2;
  grid-row: 1;
}

.source {
  grid-column: 3;
  grid-row: 1;
  width: 1em;
  height: 1em;
  justify-self: right;
  align-self: center;
  background-color: lightgrey;
  border-radius: 10px;
}

.selectedsource {
  grid-column: 3;
  grid-row: 1;
  width: 1em;
  height: 1em;
  justify-self: right;
  align-self: center;
  background-color: lightgreen;
  border-radius: 10px;
}
</style>
