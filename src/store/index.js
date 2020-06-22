import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hfkey:`f535c8cd2ec5410ab44e13e9bdc474fc`,
    txmapkey:`3f1bb1feb338cac15b43209d4df634b8`,
    jdkey:`fee56a80d2e626bea62da9dbb34e7697`,
    isCeshow:false,
    site:'广州'
  },
  mutations: {
    setisCeshow(state,val) {
      state.isCeshow = val;
    },
    changeSite(state,val){
      state.site=val
    }
  },
  actions: {
    
  },
  modules: {
  }
})
