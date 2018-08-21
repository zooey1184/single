/*********
route => 存储自身控制的路由 路由变化 beforeEach  数组>0 可返回  [自动]
rHistory => 存储历史控制的路由 push pop $router.back()        [手动]
*********/

export default {
  data: ()=> ({
    page_dir: 'fade'
  }),
  methods: {
    getHistory() {
      let app = this.$router
      let self = this
      app.beforeEach((to, from, next) => {
        let s = window.sessionStorage
        let r = (s.route && (typeof(JSON.parse(s.route))=='object') && JSON.parse(s.route).length>0)?JSON.parse(s.route):[]
        if( from.path=='/' && (!to.path || to.path=='/') ) {
          // 初始进入首页'/'的情况  一般走不到这一步
          r = ["/"]
        }else if(from.path=='/' && to.path!='/') {
          // 初始从'/'到其他路由
          if(r.length==0) {
            r = ["/"]
          }
        }else {
          let len = r.length
          if(len>0) {
            if(r[len-1]==to.path) {
              // back
              r.pop()
              // self.set_pageAction('backward')
              self.page_dir = 'backward'
            }else {
              // go
              r.push(from.path)
              // self.set_pageAction('forward')
              self.page_dir = 'forward'
            }
          }else {
            r = []
            self.page_dir = 'forward'
            console.log('can not back');
          }
        }
        window.sessionStorage.setItem('route', JSON.stringify(r))
        next()
      })
    }
  }
}
