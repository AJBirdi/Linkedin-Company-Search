import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import axios from 'axios'
import VueRouter from 'vue-router'

import HelloWorld from '@/components/HelloWorld'

Vue.use(axios)
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: HelloWorld },
]

const router = new VueRouter({
  routes: routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
