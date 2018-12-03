import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'
import websocket from './modules/websocket'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({

  // initial state
  state: {
    discovered: {},
    shadows: {},
    bricks: {},
    dashboard: {},
    sources: {},
    targets: {},
    selectedsource: null,
    selectedtarget: null,
    renderconnections: false
  },

  getters: {

    discovered ({ discovered }) { return discovered },
    shadowed ({ shadows }) { return shadows },
    shadowmodels ({ shadows }) {
      const models = []
      for (var nodeid in shadows) {
        for (var modelid in shadows[nodeid]) {
          models.push(shadows[nodeid][modelid])
        }
      }
      return models
    },
    bricks ({ bricks }) { return bricks },
    dashboard ({ dashboard }) { return dashboard },
    selectedsource ({ selectedsource }) { return selectedsource },
    selectedtarget ({ selectedtarget }) { return selectedtarget },
    sources ({ sources }) { return sources },
    targets ({ targets }) { return targets },
    connections ({ shadows, sources, targets, renderconnections }) {
      const results = []

      Object.keys(shadows).forEach(nodeid => {
        Object.keys(shadows[nodeid]).forEach(modelid => {
          Object.keys(shadows[nodeid][modelid].wires).forEach(pprop => {
            Object.keys(shadows[nodeid][modelid].wires[pprop]).forEach(consumeruri => {
              const produceruri = [nodeid, modelid, pprop].join('/')
              if (sources[produceruri] && targets[consumeruri]) {
                results.push({
                  start: sources[produceruri],
                  end: targets[consumeruri]
                })
              }
            })
          })
        })
      })

      return results
    }
  },

  mutations: {

    updatediscovered (state, discovered) { state.discovered = discovered },
    updateshadows (state, shadows) { state.shadows = shadows },
    updatebricks (state, bricks) { state.bricks = bricks },

    setselectedsource (state, uri) { state.selectedsource = uri },
    clearseletedsource (state) { state.selectedsource = null },
    setselectedtarget (state, uri) { state.selectedtarget = uri },
    clearseletedtarget (state) { state.selectedtarget = null },

    addsource (state, source) { state.sources[source.uri] = source },
    addtarget (state, target) { state.targets[target.uri] = target },
    renderconnections (state, renderconnections) { state.renderconnections = !state.renderconnections }
  },

  actions: {

    update ({ commit }, agentdata) {
      commit('updatediscovered', agentdata.discovered)
      commit('updateshadows', agentdata.shadows)
      commit('updatebricks', agentdata.bricks)
    },

    doaction ({ dispatch }, action) {
      dispatch('websocket/send', action)
    },

    set ({ dispatch }, nodeid, modelid, propname, value) {
      dispatch('websocket/send', ['udm', [ nodeid, modelid, propname, value ]])
    },

    shadow ({dispatch, getters}, nodeid) {
      dispatch('websocket/send', ['shadow', [ nodeid ]])
      // router.push({ name: 'Shadowed', params: { nodeid: nodeid, modelid: '1' } })
    },

    unshadow ({commit, dispatch}, nodeid) {
      dispatch('websocket/send', ['unshadow', [ nodeid ]])
      // router.push('Discovered') // back to discovered page
    },

    selectsource ({ commit, getters, dispatch }, uri) {
      if (getters.selectedsource === uri) {
        commit('clearseletedsource')
      } else {
        commit('setselectedsource', uri)
        if (getters.selectedsource && getters.selectedtarget) {
          dispatch('wire', [getters.selectedsource, getters.selectedtarget])
          commit('clearseletedsource')
          commit('clearseletedtarget')
        }
      }
    },
    selecttarget ({ commit, getters, dispatch }, uri) {
      if (getters.selectedtarget === uri) {
        commit('clearseletedtarget')
      } else {
        commit('setselectedtarget', uri)
        if (getters.selectedsource && getters.selectedtarget) {
          dispatch('wire', [getters.selectedsource, getters.selectedtarget])
          commit('clearseletedsource')
          commit('clearseletedtarget')
        }
      }
    },

    addsource ({ commit }, source) {
      commit('addsource', source)
    },
    addtarget ({ commit }, target) {
      commit('addtarget', target)
    },

    wire ({ dispatch }, wiredata) {
      const produceruri = wiredata[0]
      const consumeruri = wiredata[1]
      dispatch('websocket/send', ['wire', produceruri, consumeruri])
    },

    unwire ({ dispatch }, wiredata) {
      const produceruri = wiredata[0]
      const consumeruri = wiredata[1]
      dispatch('websocket/send', ['unwire', produceruri, consumeruri])
    },

    addbrick ({ dispatch }, packagename) {
      dispatch('websocket/send', ['addbrick', packagename])
    },

    removebrick ({ dispatch }, modelid) {
      dispatch('websocket/send', ['removemodel', modelid])
    },

    searchbricks () {},

    installbrick () {},

    uninstallbrick () {},

    renderconnections ({commit}) {
      commit('renderconnections')
    }
  },

  modules: {
    websocket
  },
  strict: debug
})
