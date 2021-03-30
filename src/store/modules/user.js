import Vue from 'vue'
import { gql } from '@/helpers/index'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    SET_PROFILE: (state, user) => {
      state.user = user
    }
  },
  getters: {
    GET_PROFILE: (state) => {
      return state.user
    },
  },
  actions: {
    SET_PROFILE: async ({ commit, dispatch }, data) => {
      commit('SET_PROFILE', data)
    },
    IMAGE_UPLOAD: async ({ dispatch, state }, image) => {
      const res = await gql.query(`
        mutation ($image: Upload!){
          uploadImage(image: $image)
            { ok errors }`, 
        {
          image
        }
      )
    }
  }
}
