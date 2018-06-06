import './loading.css'
import loading_d_white from './loading_d_white.png'
import loading_d_blue from './loading_d_blue.png'
import loading_d_green from './loading_d_green.png'
export default (Vue) => {
  Vue.directive('loading', {

    update: function(el, binding, vNode) {
      // 创建元素
      let element = document.createElement('div')
      let id = 'loading_sync'
      if (typeof(binding.value) === 'object') {
        id = `loading_sync_${binding.value.id}`
      }
      element.setAttribute('id', id)
      let img = new Image()
      // 修饰符 body || part 默认body
      let objM = binding.modifiers
      if (JSON.stringify(objM) != '{}' && objM.part) {
        element.classList.add('part_loading')
      } else {
        element.classList.add('fullpage_loading')
      }
      // 指令 light || dark 默认light
      let strA = binding.arg
      if (!!strA && strA == 'dark') {
        element.classList.add('dark_style')
        img.src = loading_d_white
      } else {
        element.classList.add('light_style')
        img.src = loading_d_green
      }
      element.appendChild(img);
      // 判断值

      if (typeof(binding.value) === 'string') {
        if (binding.value == true) {
          if (JSON.stringify(objM) != '{}' && objM.part) {

            el.appendChild(element)
          } else {
            document.body.appendChild(element)
          }
        } else {
          let ld = document.getElementById(id)
          if (ld) {
            if (JSON.stringify(objM) != '{}' && objM.part) {
              el.removeChild(ld)
            } else {
              document.body.removeChild(ld)
            }
          } else {
            return
          }
        }
      } else if (typeof(binding.value) === 'object') {

        if (binding.value.loading == true) {
          if (JSON.stringify(objM) != '{}' && objM.part) {
            // console.log(binding.value);
            let obj = binding.value
            if(!!obj.background) {
              element.style.background = obj.background
            }
            if(!!obj.borderRadius) {
              element.style.borderRadius = obj.borderRadius
            }
            el.appendChild(element)
          } else {
            let obj = binding.value
            if(!!obj.background) {
              element.style.background = obj.background
            }
            document.body.appendChild(element)
          }
        } else {
          let ld = document.getElementById(id)
          if (ld) {
            if (JSON.stringify(objM) != '{}' && objM.part) {
              el.removeChild(ld)
            } else {
              document.body.removeChild(ld)
            }
          } else {
            return
          }
        }
      }
    }
  })
}
