import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/404',
    name: '404',
    meta: { layout: 'empty' },
    component: require('@/views/errors/404.vue').default
  },
  {
    path: '*',
    beforeEnter(to, from, next) {
      next({name: '404'})
    } 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( async (to, from, next) => {
  next()
})

export default router
