<template>
  <div class="buttonprop">
    <div class="label">{{ meta.label }} </div>
    <!--input class="property" :value="value" @input="set" /-->
    <div v-bind:class="buttonclass" @mousedown.prevent="set()" @click.prevent="reset()">
      {{meta.label}}
    </div>
  </div>
</template>

<script>

export default {
  props: ['meta', 'value', 'nodeid', 'modelid', 'propname'],
  data () {
    return {
      pressstate: false
    }
  },
  computed: {
    buttonclass () {
      var clazz = 'property button button-outline button-small'
      if (this.value) { clazz = clazz + ' button-fill' }
      if (this.pressstate) { clazz = clazz + ' active-state' }
      return clazz
    }
  },
  methods: {
    set () {
      if (!this.pressstate) { this.pressstate = true }
      this.$store.dispatch('websocket/send', ['udm', [ this.nodeid, this.modelid, this.propname, true ]])
    },
    reset () {
      if (this.pressstate) { this.pressstate = false }
      this.$store.dispatch('websocket/send', ['udm', [ this.nodeid, this.modelid, this.propname, false ]])
    }
  }
}
</script>

<style scoped>

.buttonprop {
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

</style>
