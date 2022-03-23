import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'



Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
//base url
//local
//axios.defaults.baseURL = 'http://localhost:3000/api';
//usando heroku
//axios.defaults.baseURL = 'https://sistemasrod.herokuapp.com/api';
//usando en vps de hostinger
axios.defaults.baseURL = 'https://sistemasrod.com/api';



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
