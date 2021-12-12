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
  async loadChargers ({ commit }) {
    try {
      const response = await axios.get(this.state.dataUrl)
      const chargers = response.data
      commit('allChargers', chargers)
      commit('filterChargers')
      commit('chargersCount', chargers.length)
    } catch (error) {
      if (this.state.chargers.length > 0) {
        commit('allChargers', this.state.chargers)
        commit('chargersCount', this.state.chargers.length)
        console.log(error, 'Displaying chargers from state', this.state.chargers)
      } else {
        let localdata = []
        for (let item in dataset) {
          item = dataset[item]
          localdata.push(item)
        }
        commit('allChargers', localdata[0])
        commit('chargersCount', localdata[0].length)
        console.log(error, 'Displaying chargers from local', localdata[0])
      }
    }
  },

  async loadSession ({ commit }, chargerData) {
    try {
      await axios.get(this.state.dataUrl + chargerData.id)
      commit('chargerData', chargerData)
    } catch (error) {
      commit('chargerData', chargerData)
      console.log(error, 'Displaying charger from local', chargerData)
    }
  },

  async deleteCharger ({ commit }, chargerId) {
    try {
      await axios.delete(this.state.dataUrl + chargerId)
      commit('remove', chargerId)
    } catch (error) {
      commit('removeFromLocal', chargerId)
      console.log(error, 'Removing charger from local', chargerId)
    }
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

  removeFromLocal (state, id) {
    state.deleted = state.charger[id]
    const filtered = state.chargers.filter(charger => {
      return charger.id != id
    })
    state.chargers = filtered
  },

  closeSession (state) {
    state.sessionLoaded = false
    state.charger = {}
  }
}

export default createStore ({
  state,
  getters,
  actions,
  mutations
})

