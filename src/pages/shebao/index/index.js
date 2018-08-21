// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import PageWrap from './components/PageWrap/PageWrap.vue'
import store from './store'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import reg from '@/plugin/VReg/VReg.js'
import Toast from '@/plugin/tip/tip.js'
import picker from '@/plugin/picker/picker.js'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'

reg(Vue)
router.beforeEach((to, from, next) => {
  if(to.path === '/login')  {
    next()
  } else {
    if(to.meta.requiresAuth && !localStorage.getItem('accessToken')) {
      // alert('请先登录')
      next({ path: '/login' })
    }else {
      next()
    }
  }
})

Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
require('es6-promise').polyfill()
Es6Promise.polyfill()
Vue.use(Toast)
Vue.use(picker)
Vue.component('page', PageWrap)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
