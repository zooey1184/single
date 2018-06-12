import Vue from 'vue'
import Vuex from 'vuex'
import Page from './page.js'
import person from './person_search.js'
import business from './business.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Page,
    person,
    business
  },
})
