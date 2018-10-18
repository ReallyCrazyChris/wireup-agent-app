<template>
  <div class="stateprop">
    <div class="label">{{ meta.label }} </div>
    <div  v-if="value"  class="property  signallamp valueistrue"/>
    <div  v-if="!value" class="property  signallamp valueisfalse"/>
  </div>
</template>

<script>

export default {
  props: ['meta', 'value', 'nodeid', 'modelid', 'propname'],
  methods: {
    set (e) {
      this.$store.dispatch('websocket/send', ['udm', [ this.nodeid, this.modelid, this.propname, e.target.value ]])
    }
  }
}
</script>

<style scoped>
.stateprop {
  display: grid;
  grid-template-columns: 80px auto auto auto;
  grid-template-rows: 2em;
}
.label {
  grid-column: 1;
  grid-row: 1;
  font-size: 0.9em;
  color: #aaa;
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

.signallamp {
    height: 20px;
    width: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,.4);
    border-radius: 10px;
}

.valueistrue {
  background: #4caf50;

}

.valueisfalse {
  background:red;
}

</style>
