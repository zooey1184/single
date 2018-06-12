export default {
	state: {
		business: null
	},
	mutations: {
		SET_BUSINESS(state, data) {
			state.business = data
		}
	},
	actions: {
		set_business(state, data){
			state.commit('SET_BUSINESS', data)
		},

	},
	getters: {
		get_business(state){
			return state.business
		},

	}
}
