import { urlOrigin, getUrlData } from '@/common/js/base'
let origin = urlOrigin()
let hualuOrigin = window.location.origin.match(/b\.51veryrich\.com/g) ? window.location.origin : (window.location.origin.match(/test\.51veryrich\.com/g) ? window.location.origin : `http://dev.51veryrich.com`)

if(!!getUrlData('api_mode')) {
	let m = getUrlData('api_mode')
	if(m=='cdn') {
		origin = 'https://b.jianbing.com'
	}else if(m=='test') {
		origin = 'http://test.jianbing.com'
	}else if(m=='kaifa') {
		origin = 'http://kaifa.jianbing.com'
	}
}
export function wrapApi(apiUrl) {
	return `${origin}/${apiUrl}`
}
export function hualuApi(apiUrl) {
	return `${hualuOrigin}/${apiUrl}`
}
