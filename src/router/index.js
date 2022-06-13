import { createRouter, createWebHashHistory } from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed'
import YourFeed from '@/views/YourFeed'
import Register from '@/views/Register'
import Login from '@/views/Login'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed 
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userFavorites',
    component: GlobalFeed
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
