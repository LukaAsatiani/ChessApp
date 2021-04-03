import Vue from 'vue'
import Vuex from 'vuex'

import notifications from '@/store/modules/notifications'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    notifications,
  }
})

export default store
