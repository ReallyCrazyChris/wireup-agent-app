<template>
  <f7-app :params="f7params">
    <f7-view main url="/"></f7-view>
  </f7-app>
</template>

<script>

import DashboardPage from './pages/Dashboard.vue'

export default {
  data () {
    return {
      // Framework7 parameters that we pass to <f7-app> component
      f7params: {
        name: 'My App',
        id: 'io.wireup.wireapp',
        version: '1.0.0',
        theme: 'md',
        routes: [
          {
            name: 'home',
            path: '/',
            component: DashboardPage
          },
          {
            name: 'dashboard',
            path: '/dashboard/',
            component: DashboardPage
          }
        ]
      }
    }
  }
}
</script>
