import { createStore } from 'vuex'
import axios from 'axios'
import dataset from './local_data/db-1638125308609.json'

const state = {
  dataUrl: 'http://localhost:3000/chargers/',
  charger: {},
  chargers: [],
  count: '',
  deleted: '',
  sessionLoaded: false
}

const getters = {
  allChargers: (state) => state.chargers,
  charger: (state) => state.charger,
  chargersCount: (state) => state.count,
  session: (state) => state.sessionLoaded
}

const actions = {
  async loadChargers({ commit }) {
    try {
      const response = await axios.get(this.state.dataUrl)
      const chargers = response.data
      commit('allChargers', chargers)
      commit('chargersCount', chargers.length)
    } catch (error) {
      let localdata = []
      for (let item in dataset) {
        item = dataset[item]
        localdata.push(item)
      }
      commit('allChargers', localdata[0])
      commit('chargersCount', localdata[0].length)
      console.log(error, 'Displaying chargers from local', localdata[0])
    }
  },

  async loadSession({ commit }, chargerData) {
    await axios.get(this.state.dataUrl + chargerData.id)
    commit('chargerData', chargerData)
  },

  async deleteCharger({ commit }, chargerId) {
    await axios.delete(this.state.dataUrl + chargerId)
    commit('remove', chargerId)
  }
}

const mutations = {
  allChargers (state, chargers) {
    state.chargers = chargers
  },

  chargersCount (state, count) {
    state.count = count
  },

  chargerData (state, chargerData) {
    const values = Object.keys(chargerData)
    values.forEach((key, n) => {
      state.charger[values[n]] = chargerData[key]
    })
    state.sessionLoaded = true
  },
  
  remove (state, id) {
    state.chargers.forEach((charger) => {
      state.charger[id] = charger[id]
      state.deleted = state.charger[id]
    })
  },

  closeSession (state) {
    state.sessionLoaded = false
    state.charger = {}
  }
}

export default createStore({
  state,
  getters,
  actions,
  mutations
})

