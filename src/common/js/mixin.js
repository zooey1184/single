import Vue from 'vue'

Vue.mixin({
	filters: {
		protocol: (src) => {
			let protocol = window.location.protocol
			if (/^(http|https)/.test(src)) {
				return src.replace(/^(http:|https:)/, protocol)
			}
		}
	},
	methods: {
		protocol: (src) => {
			let protocol = window.location.protocol
			if (/^(http|https)/.test(src)) {
				return src.replace(/^(http:|https:)/, protocol)
			}
		}
	}
})