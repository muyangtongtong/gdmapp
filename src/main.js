// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
// 引入全部组件
import MintUI from 'mint-ui'
import Elementui from 'element-ui'
import 'mint-ui/lib/style.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import $http from '@/assets/js/http'
Vue.use(MintUI)

Vue.config.productionTip = false

Vue.use(Elementui)
Vue.use(Vuex)
Vue.prototype.$http = $http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
