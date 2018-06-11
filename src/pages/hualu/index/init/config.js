import {timeFormate} from '@/common/js/base'

export default {
  data() {
    let t = timeFormate().formate()
    let data = {
      jyfqjd: "YH0001",
      yzm: "AD212DACWEWER232D2EE",
      fqlsh: "20151212000000001",
      jbr: "ABC",
      fqsj: t
    }
    return data
  },
  submitJson(d={}) {
    Object.assign(d, this.data())
    let arr = [d]
    let s = JSON.stringify(arr)
    return `####${s}$$$$`
  },
  formJson(t) {
    let s = t
    if(t.match('####')) {
      s = s.replace("####", "")
    }
    if(t.match(/\$\$\$\$/g)) {
      s = s.replace("$$$$", "")
    }
    console.log(s);
    try {
      s = JSON.parse(s)
      console.log(s);
    } catch (e) {
      console.log(e);
    } finally {

    }
    return s
  }
}
