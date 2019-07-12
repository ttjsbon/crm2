import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.css'
import LightTimeline from 'vue-light-timeline';
import './icons' // icon
import './permission' // permission control
// import './mock' // simulation data
import moment from 'moment'
Vue.use(Antd)
Vue.use(LightTimeline)
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.filter(
  'dateformat',
  function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
  }
)
