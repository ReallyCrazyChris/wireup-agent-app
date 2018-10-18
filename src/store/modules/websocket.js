import encode from './encode'
import decode from './decode'
// initial state
const state = {
  connected: false,
  ws: null
}

// getters
const getters = {
  isConnected: (state, getters) => {
    return state.connected
  },
  getWebsocket: (state, getters) => {
    return state.ws
  }
}

// mutations
const mutations = {
  connected (state, ws) {
    state.connected = true
    state.ws = ws
  },

  disconnected (state) {
    state.connected = false
    state.ws = null
  }
}

// actions
const actions = {

  connect (store) {
    const ws = new WebSocket('ws://127.0.0.1:9090')
    // const ws = new WebSocket('ws://192.168.2.107:9090')
    // const ws = new WebSocket('ws://10.81.131.170:9090')

    ws.onopen = function (event) {
      console.log('WebSocket is open now.')
      store.commit('connected', ws)
    }

    ws.onclose = function (event) {
      console.log('WebSocket is closed now.')
      store.commit('disconnected')
    }

    ws.onmessage = function (event) {
      console.log('WebSocket got Data', event.data)

      var reader = new FileReader()

      reader.onload = function () {
        var agentdata = decode(reader.result, 'utf8')
        store.dispatch(agentdata[0], agentdata[1], { root: true })
      }

      reader.readAsText(event.data)
    }

    ws.onerror = function (event) {
      console.log('WebSocket haserror .')
    }
  },
  disconnect ({ commit, state, getters }) {
    console.log('Try Disconnect')
    getters.getWebsocket.close()
  },
  send ({ commit, state }, action) {
    console.log('sending to agent', action)
    const msg = encode(action)
    state.ws.send(msg)
  },
  receive ({ commit, state }) {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
