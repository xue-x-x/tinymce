// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import router from './router'

import ElementUI from 'element-ui'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'element-ui/lib/theme-chalk/index.css'
import animate from 'animate.css'

import store from './store'
import Common from './util/util.js'

import './assets/css/app.css'
import './assets/css/unify.css'

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.use(ElementUI)
Vue.use(animate)
Vue.use(VueAxios, axios)
Vue.use(Common)
// axios.defaults.headers.common['X-CSRFToken'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
