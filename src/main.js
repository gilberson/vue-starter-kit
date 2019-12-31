import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
 
Vue.prototype.$api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_ROOT_API_DEV : process.env.prod.VUE_APP_ROOT_API_PROD
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
