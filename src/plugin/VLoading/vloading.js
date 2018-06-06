import './loading.css'
import loading_d_white from './loading_d_white.png'
import loading_d_blue from './loading_d_blue.png'
import loading_d_green from './loading_d_green.png'
export default (Vue) => {
  Vue.directive('loading', {
    bind: function(el, binding, vNode) {
      // 修饰符 body || part 默认body
      let objM = binding.modifiers
      let objV = binding.value
      let strA = binding.arg
      let id = 'loading_sync'
      if (typeof(binding.value) === 'object') {
        id = `loading_sync_${binding.value.id}`
      }
      function hasEle() {
        let element = document.getElementById(id)
        if(!element) {
          // 创建id元素
          let createEle = document.createElement('div')
          // 创建id内部元素
          let createEleContain = document.createElement('div')

          createEle.appendChild(createEleContain)
          createEle.classList.add('WRAPLoading')
          createEle.setAttribute('id', id)
          let img = new Image()
          // 亮暗主题样式
          if (!!strA && strA == 'dark') {
            createEleContain.classList.add('dark_style')
            img.src = loading_d_white
          } else {
            createEleContain.classList.add('light_style')
            img.src = loading_d_green
          }
          createEleContain.appendChild(img);
          // 添加背景色
          if(!!objV.background) {
            createEleContain.style.background = objV.background
          }
          // 局部&全局样式
          if (JSON.stringify(objM) != '{}' && objM.part) {
            createEleContain.classList.add('part_loading')
            if(!!objV.borderRadius) {
              createEleContain.style.borderRadius = objV.borderRadius
            }
            el.appendChild(createEle)
          } else {
            createEleContain.classList.add('fullpage_loading')
            document.body.appendChild(createEle)
          }
          createEle.style.display = 'none'
          element = createEle
        }else {
          element.style.display = 'none'
        }
        return element
      }
      // 判断显示隐藏
      if (binding.value.loading == true || binding.value.loading == 'true') {
        let e = hasEle()
        e.style.display = 'block'
      } else {
        let ld = document.getElementById(id)
        if (ld) {
          if (JSON.stringify(objM) != '{}' && objM.part) {
            ld.style.display = 'none'
            // el.removeChild(ld)
            return
          } else {
            // document.body.removeChild(ld)
            ld.style.display = 'none'
            return
          }
        } else {
          return
        }
      }
    },
    update: function(el, binding, vNode) {
      // 修饰符 body || part 默认body
      let objM = binding.modifiers
      let objV = binding.value
      let strA = binding.arg
      let id = 'loading_sync'
      if (typeof(binding.value) === 'object') {
        id = `loading_sync_${binding.value.id}`
      }
      function hasEle() {
        let element = document.getElementById(id)
        if(!element) {
          let createEleContain = document.createElement('div')
          let createEle = document.createElement('div')
          createEle.appendChild(createEleContain)
          createEle.classList.add('WRAPLoading')
          createEle.setAttribute('id', id)

          let img = new Image()
          // 亮暗主题样式
          if (!!strA && strA == 'dark') {
            createEleContain.classList.add('dark_style')
            img.src = loading_d_white
          } else {
            createEleContain.classList.add('light_style')
            img.src = loading_d_green
          }
          createEleContain.appendChild(img);
          // 添加背景色
          if(!!objV.background) {
            createEleContain.style.background = objV.background
          }
          // 局部&全局样式
          if (JSON.stringify(objM) != '{}' && objM.part) {
            createEleContain.classList.add('part_loading')
            if(!!objV.borderRadius) {
              createEleContain.style.borderRadius = objV.borderRadius
            }
            el.appendChild(createEle)
          } else {
            createEleContain.classList.add('fullpage_loading')
            document.body.appendChild(createEle)
          }
          element = document.getElementById(id)
        }
        element.style.display = 'none'
        return element
      }
      // 判断显示隐藏
      if (binding.value.loading == true || binding.value.loading == 'true') {
        let e = hasEle()
        e.style.display = 'block'
      } else {
        let ld = document.getElementById(id)
        if (ld) {
          if (JSON.stringify(objM) != '{}' && objM.part) {
            ld.style.display = 'none'
            // el.removeChild(ld)
            return
          } else {
            // document.body.removeChild(ld)
            ld.style.display = 'none'
            return
          }
        } else {
          return
        }
      }
    },
  })
}
