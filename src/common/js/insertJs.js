// 动态添加脚本
export default function insertJs(url="", env=["kaifa", "test", "cdn"], callback=function(){}) {
  let h = window.location.host
  let script = document.getElementsByTagName('script')
  let reg = url
  let r = new RegExp(reg)
  let e = "kaifa"
  class Js {
    hasJs() {
      let a = false
      for(let value of script) {
        if(value.src.match(r)) {
          a = true
        }
      }
      return a
    }
    env() {
      if(h.match(/(kaifa\.jianbing\.com|localhost|127\.0\.0\.1)/g) ) {
        e = "kaifa"
      }else if(h.match(/(test\.jianbing\.com)/g) ) {
        e = "test"
      }else if(h.match(/(b\.jianbing\.com)/g)) {
        e = "cdn"
      }
      return e
    }
    insert() {
      var vds = document.createElement('script');
      vds.type = 'text/javascript';
      vds.async = true;
      vds.src = url
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(vds, s);
      callback()
    }
    insertJs() {
      let t = this.hasJs()
      if(t) {
        callback()
        return
      }else {
        let e = this.env()
        for(let value of env) {
          if(e==value) {
            this.insert()
          }else {
            return
          }
        }
      }
    }
  }
  let v = new Js()
  v.insertJs()
}
