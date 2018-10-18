<template>
  <div class="numberprop">
    <div class="label">{{ meta.label }}</div>
    <f7-stepper small round fill
      :value="value"
      :min="0"
      :max="1000"
      :step="1"
      :autorepeat="true"
      :wraps="true"
      :manual-input-mode="true"
      :decimal-point="2"
      @stepper:change="set">
    </f7-stepper>
  </div>
</template>

<script>

export default {
  props: ['meta', 'value', 'nodeid', 'modelid', 'propname'],
  methods: {
    set (value) {
      this.$store.dispatch('websocket/send', ['udm', [ this.nodeid, this.modelid, this.propname, value ]])
    }
  }
}
</script>

<style scoped>

.numberprop {
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
  grid-column: 2;
  grid-row: 1;
  font-size: 0.9em;
  background-color: transparent;
  border: 0px solid;
  align-self: center;
}

.unit {
  grid-column: 3;
  grid-row: 1;
  font-size: 0.5em;
  color: #aaa;
  align-self: center;
}

.controls {
  grid-column: 4;
  grid-row: 1;
  font-size: 0.9em;
  color: #aaa;
  align-self: center;
}
</style>
