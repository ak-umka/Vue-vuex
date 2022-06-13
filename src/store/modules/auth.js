import apiAuth from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  isLoading: false,
  validationErrors: null,
  isLoggedIn: null
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
} 

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymus: '[auth] isAnonymus',
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymus]: state => {
    return state.isLoggedIn === false
  }
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null 
  },

  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },

  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null 
  },

  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },

  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },

  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },

  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.currentUser = null
    state.isLoggedIn = false
  }

}

const actions = {
  [actionTypes.register](context, credentials) {
    new Promise(resolve => {
      context.commit(mutationTypes.registerStart)
      apiAuth
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.registerSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationTypes.registerFailure, result.response.data.errors)
        })
    })
  },

  async [actionTypes.login](context, credentials) {
    try {
      context.commit(mutationTypes.loginStart)
      const response = await apiAuth.login(credentials)
      context.commit(mutationTypes.loginSuccess, response.data.user)
      setItem('accessToken', response.data.user.token)
    } catch (error) {
      context.commit(mutationTypes.registerFailure, error.response.data.errors)
    }
  },

  async [actionTypes.getCurrentUser](context) {
    try {
      context.commit(mutationTypes.getCurrentUserStart)
      const response = await apiAuth.getCurrentUser()
      context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
    } catch (error) {
      context.commit(mutationTypes.getCurrentUserFailure)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}