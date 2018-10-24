<template>
  <div class="textprop">
    <div class="label">{{ meta.label }} </div>
    <div class="property" @click.prevent="set()">
      <f7-toggle :checked="value" color="green"/>
    </div>
  </div>
</template>

<script>

export default {
  props: ['meta', 'value', 'nodeid', 'modelid', 'propname'],
  methods: {
    set () {
      this.$store.dispatch('websocket/send', ['udm', [ this.nodeid, this.modelid, this.propname, !this.value ]])
    }
  }
}
</script>

<style scoped>
.textprop {
  display: grid;
  grid-template-columns: 80px auto auto auto;
  grid-template-rows: 2em;
}
.label {
  grid-column: 1;
  grid-row: 1;
  font-size: 0.9em;
  color: black;
  align-self: center;
}
.property {
  grid-column: 2 / span 3;
  grid-row: 1;
  font-size: 0.9em;
  background-color: transparent;
  border: 0px solid;
  align-self: center;
  justify-self: center;
}
</style>
