import popularTagsApi from '@/api/popularTags';

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] getPopularTagsStart',
  getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
  getPopularTagsFailure: '[popularTags] getPopularTagsFailure',
}

export const actionTypes = {
  getPopularTags: '[popularTags] getPopularTags',
}

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getPopularTagsFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  }
}

const actions = {
  async [actionTypes.getPopularTags](context) {
    try {
      context.commit(mutationTypes.getPopularTagsStart)
      const tags = await popularTagsApi.getPopularTags()
      context.commit(mutationTypes.getPopularTagsSuccess, tags)
    } catch (error) {
      context.commit(mutationTypes.getPopularTags)
    }
  }
}

export default {
  state,
  mutations,
  actions
}