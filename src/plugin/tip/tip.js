import Alert from './Tip.vue' // 引入vue模板
var Toast = {} // 定义插件对象
Toast.install = function(Vue, options) { // vue的install方法，用于定义vue插件
  // 如果toast还在，则不再执行
  if (document.getElementsByClassName('toast_pane').length) {
    return
  }
  let ToastTpl = Vue.extend(Alert)
  let $vm = new ToastTpl() // 实例化vue实例
  // window.vTip = $vm

  let tpl = $vm.$mount().$el
  document.body.appendChild(tpl)
  window.vm = $vm
  // console.log($toast);
  Vue.prototype.$toast = { // 在Vue的原型上添加实例方法，以全局调用
    show: function(options) { // 控制toast显示的方法
      if (document.getElementsByClassName('toast_pane').length) {
        return
      }
      if (typeof(options) === 'string') { // 对参数进行判断
        $vm.message = options // 传入props
        // $vm.position = 'middle'
        // $vm.type = ''
        // $vm.background = 'rgba(0,0,0,0.6)'
        $vm.position = 'top'
        $vm.type = ''
        $vm.background = 'rgba(250,100,100,.9)'
        $vm.color = '#fff'
        $vm.isOrigin = true
        $vm.showToast = true
        $vm.isOrigin = false
        setTimeout(() => {
          $vm.showToast = false
        }, 2500)
      } else if (typeof(options) === 'object') {
        Object.assign($vm, options)
        $vm.showToast = true
        if(!options.isOrigin) {
          $vm.isOrigin = false
        }
        if(!options.background && options.position && options.position!='top') {
          $vm.background = 'rgba(0, 0, 0, .7)'
        }
        if (!!options.duration) {
          setTimeout(() => {
            $vm.showToast = false
          }, options.duration)
        } else {
          setTimeout(() => {
            $vm.showToast = false
          }, 2500)
        }
      }
    },
    hide: function() {
      $vm.showToast = false
    }
  }
}
export default Toast;
