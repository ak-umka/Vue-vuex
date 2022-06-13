import apiFeed from '@/api/feed';

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[feed] getFeedFailure',
}

export const actionTypes = {
  getFeed: '[feed] getFeed',
}

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getFeedFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  }
}

const actions = {
  async [actionTypes.getFeed](context, { apiUrl }) {
    try {
      context.commit(mutationTypes.getFeedStart)
      const response = await apiFeed.getFeed(apiUrl)
      context.commit(mutationTypes.getFeedSuccess, response.data)
      
    } catch (error) {
      context.commit(mutationTypes.getFeedFailure, error.response.data.errors)
    }
  }
}

export default {
  state,
  mutations,
  actions
}