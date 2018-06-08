export default {
	state: {
		page_action: 'fade',
		login: 'login'
	},
	mutations: {
		SET_PAGE_ACTION(state, action){
			state.page_action = action
		},
		SET_LOGIN(state, s) {
			state.login = s
		}
	},
	actions: {
		set_pageAction(state, action){
			state.commit('SET_PAGE_ACTION', action)
		},
		set_login(state, s) {
			state.commit('SET_LOGIN', s)
		}
	},
	getters: {
		get_pageAction(state){
			return state.page_action
		},
		get_login(state) {
			return state.login
		}
	}
}
