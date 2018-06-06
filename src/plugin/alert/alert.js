import Alert from './alert.vue' // 引入vue模板
var alert = {} // 定义插件对象
alert.install = function(Vue, options) { // vue的install方法，用于定义vue插件
  // 如果toast还在，则不再执行
  if (document.getElementsByClassName('alert_pane').length) {
    return
  }
  let alertTpl = Vue.extend(Alert)
  let $valert = new alertTpl() // 实例化vue实例
  // window.vTip = $vm
  window.valert = $valert
  let tpl = $valert.$mount().$el
  document.body.appendChild(tpl)
  Vue.prototype.$alert = { // 在Vue的原型上添加实例方法，以全局调用
    confirm: (options)=> {
      try {
        if (document.getElementsByClassName('alert_pane').length) {
          return
        }
        Object.assign($valert, options)
        if(!options.title) {
          $valert.title="提示"
        }
        if(!options.btn) {
          $valert.btn=['取消', '确定']
        }
        if(!options.animate) {
          $valert.animate='fade'
        }
        $valert.showToast = true
      } catch (e) {
        console.log(e);
      } finally {
        return
      }
    },
    hide: function() {
      $valert.showToast = false
    }
  }

}
export default alert;
