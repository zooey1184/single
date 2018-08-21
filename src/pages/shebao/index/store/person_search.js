export default {
	state: {
		personData: null
	},
	mutations: {
		SET_PERSONDATA(state, data) {
			state.personData = data
		}
	},
	actions: {
		set_personData(state, data){
			state.commit('SET_PERSONDATA', data)
		},
		
	},
	getters: {
		get_personData(state){
			return state.personData
		},
		
	}
}
