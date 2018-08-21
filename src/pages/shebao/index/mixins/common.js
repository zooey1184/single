import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions([
      'set_pageAction'
    ]),
    // 控制路由 control_route
    cr() {
      let app = this.$router
      let self = this
      let s = window.sessionStorage
      let r = (s.crHistory && (typeof(JSON.parse(s.crHistory))=='object') && JSON.parse(s.crHistory).length>0)?JSON.parse(s.crHistory):[]
      class CR {
        go() {
          app.beforeEach((to, from, next)=> {
            r.push(from.path)
            window.sessionStorage.setItem('crHistory', JSON.stringify(r))
            self.set_pageAction('forward')
            next()
          })
        }
        back() {
          app.beforeEach((to, from, next)=> {
            let len = r.length
            if(len>0) {
              r.pop()
            }
            window.sessionStorage.setItem('crHistory', JSON.stringify(r))
            self.set_pageAction('backward')
            next()
          })
        }
        replace() {
          self.set_pageAction('forward')
          next()
        }
        clear(dir='forward') {
          if(dir=='forward') {
            r = []
            window.sessionStorage.setItem('crHistory', JSON.stringify(r))
            self.set_pageAction('forward')
            next()
          }else {
            r = []
            window.sessionStorage.setItem('crHistory', JSON.stringify(r))
            self.set_pageAction('backward')
            next()
          }
        }
        canback() {
          let len = r.length
          let c = true
          if(len>0) {
            c = true
          }else {
            c = false
          }
          return c
        }
      }
      return new CR()
    }
  }
}
