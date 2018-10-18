<template>
  <f7-page name="dashboard">
    <shadowed/>
    <picker/>
  </f7-page>
</template>

<script>
import shadowed from '../components/Shadowed.vue'
import picker from '../components/Picker.vue'
export default {
  data () {
    return {
      pickProduct: false,
      pickBrick: false,
      pickCloud: false
    }
  },
  components: {
    shadowed: shadowed,
    picker: picker
  }
}
</script>
