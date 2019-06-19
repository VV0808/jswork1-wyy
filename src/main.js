import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import 'iview/dist/styles/iview.css'
import iView from 'iview'
Vue.config.productionTip = false
import Filters from './filters' 
Filters(Vue)
Vue.use(iView)
var FastClick = require('fastclick')
FastClick.attach(document.body)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('common/image/default.jpg'),
  error: require('common/image/error.jpg')
})


import './common/stylus/index.styl'
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
