// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Import Vue
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import VueDraggableResizable from 'vue-draggable-resizable'
import Framework7 from 'framework7/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'
// eslint-disable-next-line
import Framework7Styles from 'framework7/css/framework7.min.css'
// eslint-disable-next-line
import IconsStyles from './css/icons.css'
// eslint-disable-next-line
import AppStyles from './css/app.css'
// Import App Component
import App from './App'

Framework7.use(Framework7Vue)
Vue.use(Vuex)
Vue.config.productionTip = true
Vue.component('vue-draggable-resizable', VueDraggableResizable)

/* eslint-disable no-new */
// Init App
new Vue({
  el: '#app',
  store,
  template: '<app/>',
  // Register App Component
  components: {
    app: App
  }
})

store.dispatch('websocket/connect')
