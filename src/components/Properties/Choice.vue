<template>
  <div class="choiceprop">
    <div class="label">{{ meta.label }} </div>
    <div class="property">
      <div  v-for="(option, index) in meta.options"  :key="index">
        <input type="radio" :name="meta.label" :id="meta.options[index]" :value="index" @input="set">
        <label :for="meta.options[index]">{{meta.options[index]}}</label>
      </div>
    </div>
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

.choiceprop {
  display: grid;
  grid-template-columns: 80px auto auto auto;
  grid-template-rows: auto;
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
