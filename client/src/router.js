import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Main from './views/Main.vue'

import store from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        store
          .dispatch('auth/authenticate')
          .then(() => {
            next('/main')
          })
          .catch(() => {
            next('/login')
          })
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      beforeEnter(to, from, next) {
        store
          .dispatch('auth/authenticate')
          .then(() => {
            next()
          })
          .catch(() => {
            next('/login')
          })
      }
    }
  ]
})
