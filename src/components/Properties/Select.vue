<template>
  <div class="selectprop">
    <div class="label">{{ meta.label }} </div>
    <select class="property" :value="value" @input="set">
      <option v-for="(option, index) in meta.options" :value="index" :key="index">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  props: ['meta', 'value', 'nodeid', 'modelid', 'propname'],
  methods: {
    set (e) {
      this.$store.dispatch('websocket/send', ['updatemodel', this.nodeid, this.modelid, this.propname, e.target.value])
    }
  }
}
</script>

<style scoped>

.selectprop {
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
}

</style>
