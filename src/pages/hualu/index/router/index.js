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
    // 业务进度
    {
      path: '/progress',
      name: 'progress',
      component: () => import('../view/progress/index.vue')
    },
    {
      path: '/progress_detail',
      name: 'progress_detail',
      component: () => import('../view/progress/detail.vue')
    },
    // 业务办理
    {
      path: '/social_index',
      name: 'social_index',
      component: () => import('../view/business/index.vue')
    },
    {
      path: '/social_detail/:state',
      name: 'social_detail',
      component: () => import('../view/business/detail.vue')
    },
    {
      path: '/social_prove',
      name: 'social_prove',
      component: () => import('../view/business/prove.vue'),
      meta: {
        title: "社保证明验证"
      }
    },
    // 个人信息查询
    {
      path: '/personal_info',
      name: 'personal_info',
      component: () => import('../view/person/personal.vue')
    },
    {
      path: '/personal_search',
      name: 'personal_search',
      component: () => import('../view/person/search.vue')
    },
    {
      path: '/personal_detail',
      name: 'personal_detail',
      component: () => import('../view/person/detail.vue')
    },
    {
      path: '/medcial_account',
      name: 'medcial_account',
      component: () => import('../view/medcial/account_search.vue')
    },
    // 个人信息打印
    {
      path: '/print_index',
      name: 'print_index',
      component: () => import('../view/print/index.vue')
    },
  ]
})
