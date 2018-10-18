<template>
  <div class="shadow">

    <productheader
      class="productheader"
      :imageurl="props.imageurl"
      :company="props.company"
      :name="props.name"
      :description="props.description">

      <div class="closebutton" slot="top" @click="unshadow(nodeid)">
        <f7-icon md="material:close" color="white"/>
      </div>
      <div class="settingsbutton" slot="bottom" @click="togglesettings">
        <f7-icon md="material:settings" size="medium" :color="showsettings ? 'blue' : 'white'"/>
      </div>
    </productheader>

    <div class="shadowproperties">
      <div v-if="!showsettings">
        <div v-for="(meta, propname, index) in control" :key="'control_'+index" class="control" >
          <wireable
            :nodeid="nodeid"
            :modelid="modelid"
            :propname="propname">
            <component
              :is="meta.display+'Prop'"
              :meta="meta"
              :value="propertyValue(props, propname)"
              :nodeid="nodeid"
              :modelid="modelid"
              :propname="propname"
            />
          </wireable>
        </div>
      </div>

      <div v-if="showsettings">
         <div v-for="(meta, propname, index) in header"   :key="'header_'+index" class="setting">
          <component
            :is="meta.display+'Prop'"
            :meta="meta"
            :value="propertyValue(props, propname)"
            :nodeid="nodeid"
            :modelid="modelid"
            :propname="propname"
          />
         </div>
        <div v-for="(meta, propname, index) in settings" :key="'settings_'+index" class="setting">
          <component
            :is="meta.display+'Prop'"
            :meta="meta"
            :value="propertyValue(props, propname)"
            :nodeid="nodeid"
            :modelid="modelid"
            :propname="propname"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ProductHeader from './ProductHeader.vue'

import ImageProp from './Properties/ImageProp.vue'
import TextProp from './Properties/TextProp.vue'
import NumberProp from './Properties/NumberProp.vue'
import StateProp from './Properties/StateProp.vue'
import ButtonProp from './Properties/ButtonProp.vue'
import ToggleProp from './Properties/ToggleProp.vue'
import ChoiceProp from './Properties/ChoiceProp.vue'
import SelectProp from './Properties/SelectProp.vue'

import Wireable from '@/components/Wire/Wireable'

import { mapActions } from 'vuex'

export default {

  props: ['product', 'nodeid', 'modelid'],

  data: function () {
    return {
      showsettings: false
    }
  },

  computed: {
    metadata: function () {
      return this.sortMetadataByIndex(this.product.meta)
    },

    props: function () {
      return this.product.props
    },

    header: function () {
      return this.filterMetadataByGroup(this.metadata, 'info')
    },

    control: function () {
      return this.filterMetadataByGroup(this.metadata, 'control')
    },

    settings: function () {
      return this.filterMetadataByGroup(this.metadata, 'settings')
    }

  },

  methods: {
    ...mapActions([
      'renderconnections',
      'unshadow'
    ]),

    sortMetadataByIndex: function (shadowmeta) {
      const keysSorted = Object.keys(shadowmeta).sort(function (a, b) { return shadowmeta[a]['index'] - shadowmeta[b]['index'] })
      const sortedMeta = {}
      for (var i = 0; i < keysSorted.length; i++) {
        sortedMeta[keysSorted[i]] = shadowmeta[keysSorted[i]]
      }
      return sortedMeta
    },

    filterMetadataByGroup: function (shadowmeta, groupname) {
      const fiteredMetadata = {}
      for (const key in shadowmeta) {
        if (
          (typeof shadowmeta[key] !== 'undefined') &&
          (typeof shadowmeta[key].group !== 'undefined') &&
          (shadowmeta[key].group === groupname)
        ) {
          fiteredMetadata[key] = shadowmeta[key]
        }
      }
      return fiteredMetadata
    },
    // TODO not currently used
    reduceMetadataGroups: function (shadowmeta) {
      const metadataGroups = []
      for (const key in shadowmeta) {
        if ((typeof shadowmeta[key] !== 'undefined') && (typeof shadowmeta[key].group !== 'undefined')) {
          if (metadataGroups.indexOf(shadowmeta[key].group) < 0) {
            metadataGroups.push(shadowmeta[key].group)
          }
        }
      }
      return metadataGroups
    },

    propertyValue: function (props, propname) {
      return props[propname]
    },

    togglesettings: function () {
      this.showsettings = !this.showsettings
    }
  },
  mounted () {
    this.renderconnections()
  },
  updated () {
    this.renderconnections()
  },
  components: {
    productheader: ProductHeader,
    imageProp: ImageProp,
    textProp: TextProp,
    numberProp: NumberProp,
    stateProp: StateProp,
    buttonProp: ButtonProp,
    toggleProp: ToggleProp,
    choiceProp: ChoiceProp,
    selectProp: SelectProp,
    wireable: Wireable
  }
}
</script>

<style>
.shadow {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto auto;

  width: max-content;
  background:rgba(255, 255, 255, 0.8);
}
.productheader {
  grid-column: 1;
  grid-row: 1 / span 3;
}

.closebutton {
  text-align: center;
  width: 2em;
  cursor: pointer;
}

.settingsbutton{
  text-align: center;
  width: 1.5em;
  cursor: pointer;
  margin: 0.2em;

}

.shadowproperties {
  grid-column: 1;
  grid-row: 4;
}

.control {
  margin-top: 0.5em;
}
</style>
