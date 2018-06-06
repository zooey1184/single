export default {
	state: {
		page_action: 'fade',
	},
	mutations: {
		SET_PAGE_ACTION(state, action){
			state.page_action = action
		}
	},
	actions: {
		set_pageAction(state, action){
			state.commit('SET_PAGE_ACTION', action)
		},
	},
	getters: {
		get_pageAction(state){
			return state.page_action
		}
	}
}
