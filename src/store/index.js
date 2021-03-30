import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import notifications from '@/store/modules/notifications'
import { gql } from '@/helpers/index'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    notifications,
    user
  },
  actions: {
    START_SESSION: async ({dispatch}) => {
      const res = await gql.query(`query { getUser  { ok user { id username email createdAt updatedAt } message}}`)
      
      if( res.ok ){
        dispatch('user/SET_PROFILE', res.user)
      }
      return res.ok
    },
    SET_TOKEN: ({}, value = null) => {
      localStorage.token = value
    },
    REDIRECT: ({state}, url) => {
      if(url !== router.history.current.path)
        router.push(url)
    }
  },
  getters: {
    
  }
})

export default store
