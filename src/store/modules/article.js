import articleApi from '@/api/article';

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',
}

export const actionTypes = {
  getArticle: '[article] getArticle',
}

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  }
}

const actions = {
  async [actionTypes.getArticle](context, { slug }) {
    try {
      context.commit(mutationTypes.getArticleStart, slug)
      const article = await articleApi.getArticle(slug)
      context.commit(mutationTypes.getArticleSuccess, article)
      console.log(article, 'dsads')
    } catch (error) {
      context.commit(mutationTypes.getArticleFailure)
    }
  }
}

export default {
  state,
  mutations,
  actions
}