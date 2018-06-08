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
      component: () => import('../view/login/loginPane.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('../view/login/forget.vue')
    },
    {
      path: '/more',
      name: 'more',
      component: () => import('../view/more.vue')
    },
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
    {
      path: '/social_index',
      name: 'social_index',
      component: () => import('../view/business/index.vue')
    },
  ]
})
