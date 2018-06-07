import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: ()=> import ('../view/NotFound.vue')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('../view/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../view/Register.vue')
    },
    // 首页 =============================================home流程
    {
      path: '/home',
      name: 'home',
      component: () => import('../view/home.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../view/info.vue')
    },
    {
      path: '/progress',
      name: 'progress',
      component: () => import('../view/progress.vue')
    },
  ]
})
