<template>
  <div>
    <f7-fab position="center-bottom" slot="fixed" color="orange">
      <f7-icon ios="f7:add" md="material:add"/>
      <f7-icon ios="f7:close" md="material:close"/>
      <f7-fab-buttons position="top">
        <f7-fab-button fab-close raised @click="showProductPicker = true; showPickerLogo = false">
          <f7-icon tooltip="Products" ios="f7:apps" md="material:apps"/>
        </f7-fab-button>
        <f7-fab-button fab-close raised @click="showBrickPicker = true"><f7-icon tooltip="Bricks" ios="f7:widgets" md="material:widgets"></f7-icon></f7-fab-button>
        <f7-fab-button fab-close raised @click="showCloudPicker = true"><f7-icon tooltip="Services" ios="f7:cloud" md="material:cloud"></f7-icon></f7-fab-button>
        <f7-fab-button fab-close ><f7-icon tooltip="Claim Product" ios="f7:fingerprint" md="material:fingerprint"></f7-icon></f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>

    <f7-sheet
      :backdrop="true"
      :closeByBackdropClick="true"
      :closeByOutsideClick="true"
      :opened="showProductPicker"
      @sheet:closed="showProductPicker = false">
      <discovered/>
    </f7-sheet>

    <f7-sheet
      :backdrop="true"
      :closeByBackdropClick="true"
      :closeByOutsideClick="true"
      :opened="showBrickPicker"
      @sheet:closed="showBrickPicker = false">
      <f7-navbar>
        <f7-nav-title>
          <f7-icon ios="f7:widgets" md="material:widgets"></f7-icon>
          Bricks
        </f7-nav-title>
      </f7-navbar>
      <discovered/>
    </f7-sheet>

    <f7-sheet
      :backdrop="true"
      :closeByBackdropClick="true"
      :closeByOutsideClick="true"
      :opened="showCloudPicker"
      @sheet:closed="showCloudPicker = false">
      <f7-navbar>
        <f7-nav-title>
          <f7-icon ios="f7:cloud" md="material:cloud"></f7-icon>
          Cloud services
        </f7-nav-title>
      </f7-navbar>
      <discovered/>
    </f7-sheet>

  </div>
</template>

<script>
import discovered from '../components/Discovered.vue'
export default {
  data () {
    return {
      showProductPicker: false,
      showBrickPicker: false,
      showCloudPicker: false
    }
  },
  components: {
    discovered: discovered
  }
}
</script>

<style>
.pickerlogo {
  width: 35px;
  height: 35px;
}
</style>
