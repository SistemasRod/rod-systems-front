import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/notas',
    name: 'Notas',
    component: () => import('../views/Notas.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/select/prospectos',
    name: 'SelectProspectos',
    component: () => import('../views/Prospectos.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/select/cotizaciones',
    name: 'SelectCotizaciones',
    component: () => import('../views/Cotizaciones.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '*',
    redirect:{
      name: 'Home'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth)
  if(rutaProtegida && store.state.token === ''){
    next({name: 'Login'})
  }else{
    next()
  }
})

export default router
