import Toast from 'plugin/toast/toast.vue'

var ToastPlugin = {}
ToastPlugin.install = function(Vue, options) {
  if (document.querySelector('.toast')) {
    return
  }
  let vm = Vue.extend(Toast)
  let toastVm = new vm()
  window.vm = toastVm
  let tpl = toastVm.$mount().$el
  document.body.appendChild(tpl)

  Vue.prototype.$toast = (tip, options = {}) => {
  	if (Object.prototype.toString.call(options) !== '[object Object]') {
  		return
  	}
	  let duration = options.duration || 2000
    if (tip && typeof tip === 'string') {
    	toastVm.message = tip
      toastVm.background = '#f44336'
      toastVm.color = '#fff'
      toastVm.toastShow = true
      setTimeout(() => {
        toastVm.toastShow = false
      }, duration)
    } else if (typeof(tip) === 'object') {
      toastVm.background = '#f44336'
      toastVm.color = '#fff'
      Object.assign(toastVm, tip) // 合并参数与实例

      toastVm.toastShow = true // 显示toast
      if (!!options.duration) {
        setTimeout(() => {
          toastVm.toastShow = false
        }, options.duration)
      } else {
        setTimeout(() => {
          toastVm.toastShow = false
        }, 2500)
      }
    }
  }
}

export default ToastPlugin
