// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import PageWrap from './components/PageWrap/PageWrap.vue'
import store from './store'

import fastclick from 'fastclick'
fastclick.attach(document.body)
// import { vConsole } from '@/common/js/vconsole'
// vConsole()
import reg from '@/plugin/VReg/VReg.js'
reg(Vue)
import Load from '@/plugin/load/load.js'
Vue.use(Load)
// import ajax from '@/plugin/ajax/ajax.js'
// Vue.use(ajax)
import 'vue-easytable/libs/themes-base/index.css'
// import table and pagination comp
import {VTable,VPagination} from 'vue-easytable'
// Register to global
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

import Toast from '@/plugin/tip/tip.js'
Vue.use(Toast)
import Alert from '@/plugin/alert/alert.js'
Vue.use(Alert)
import picker from '@/plugin/picker/picker.js'
Vue.use(picker)

Vue.component('page', PageWrap)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
