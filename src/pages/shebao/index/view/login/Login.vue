<template lang="html">
  <page bgWrap="#fff" :state='pageState' :showHeader="false">
    <div>
      <div>
        <transition name="btm_offset">
          <h3 class="loginPage_title_top" v-if="showLogin">欢迎登录</h3>
        </transition>

      </div>
      <div class="login_pane">
        <div v-if="login_phone">
          <div class="input_item">
            <input type="text" placeholder="手机号">
          </div>
          <div class="input_item">
            <input type="text" placeholder="手机验证码">
            <div class="countDown_pane">
              <count-down></count-down>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="input_item">
            <input type="text" placeholder="社保账号（身份证号）" v-model="iscode">
          </div>
          <div class="input_item">
            <input type="password" placeholder="请输入密码" v-model="pwd">
          </div>
        </div>

        <button class="btn login" @click="submitFn">登录</button>
        <p class="login_pwd_tip">没有账号？
          <span style="color: rgb(57, 160, 255)" @click="goRegister">去注册</span>
        </p>
        <div class="">
          <p class="login__footer--tip"> 2017年12月31日前参保的人员，用户已注册，初始密码为：000000。
2018年01月01日后参保的人员，请先注册账户后再登录系统。
（本网站推荐使用IE8.0以上版本的浏览器进行访问！）</p>
        </div>
        <!-- <div style="margin-top: 40px;">
          <split-line>
            <p>其他登陆方式</p>
          </split-line>
        </div>
        <p class="social" @click="goSocial">{{loginType}}</p> -->
      </div>
    </div>
  </page>
</template>

<script>
import {mapActions} from 'vuex'
import path from '@/api/path'
import dataDeal from '../../init/config'
import {getUrlData} from '@/common/js/base'
import $ from 'jquery'

export default {
  components: {
    countDown: ()=> import ('@/components/CountDown/CountDown.vue'),
    splitLine: ()=> import ('@/components/AvgPane/SplitLine.vue')
  },
  data: ()=>({
    showLogin: false,
    login_phone: false,
    loginType: "社保账号登录",
    iscode: "",
    pwd: "",
    time: 10,     // 5分钟失效
    pageState: 'loading'
  }),
  props: {
    icon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions([
      'set_login'
    ]),
    goRegister() {
      // this.set_login('register')
      window.location.href = 'http://shbx.sxxhrss.gov.cn/operation/f/user/register'
    },
    goSocial() {
      if(this.login_phone) {
        this.login_phone = false
        this.loginType = '验证码登录'
      }else {
        this.login_phone = true
        this.loginType = '社保账号登录'
      }
    },
    submitFn() {
      if(this.login_phone) {
        // 验证码方式login
      }else {
        // 社保账号登录
        if(this.iscode!=="") {
          if(this.pwd!==""){
            // this.loginFn()
            this.login2Fn()
          }else {
            this.$toast.show("密码不能为空")
          }

        }else {
          this.$toast.show('账号不能为空')
        }
      }
    },
    accessTokenFn() {
      let d = new Date()
      let t = d.getTime()
      let offsetTime = this.time * 60 * 1000
      let time = t + offsetTime
      // 330682199106040014     330621199212202993
      window.localStorage.setItem('loginTime', time)
      window.localStorage.setItem('accessToken', true)
    },
    loginOutFn() {
      let self = this
      let loginT = self.time * 60 * 1000
      let t = 0
      let timer = setInterval(()=> {
        t++
        if(t<10) {
          let d = new Date()
          let time = d.getTime()
          let loginTime = localStorage.getItem('loginTime')
          if(loginTime) {
            if(Number.parseInt(loginTime)-time >= 0) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('loginTime')
              clearInterval(timer)
              return
            }
          }else {
            localStorage.removeItem('accessToken')
            clearInterval(timer)
            return
          }
        }else {
          clearInterval(timer)
        }
      }, loginT)
    },
    login2Fn() {
      const self = this
      $.ajax({
        url: path().login,
        data: {
          sfz: self.iscode,
          pw: self.pwd
        },
        type: 'GET',
        success: r=> {
          let ret = JSON.parse(r)
          if(ret.rtmsg===1 || ret.rtmsg=='1') {
            self.accessTokenFn()
            window.localStorage.setItem('id', self.iscode)
            window.sessionStorage.setItem('iscode', self.iscode)
            
            self.$toast.show({
              position: 'middle',
              type: 'success',
              message: "登录成功"
            })
            setTimeout(()=> {
              self.nextStep(self.iscode)
            }, 50)
            setTimeout(()=> {
              self.iscode = ''
              self.pwd = ''
            }, 600)
          }else {
            self.$toast.show('登录失败，请检查登录信息')
          }
        }
      })
    },
    login3Fn() {
      const self = this
      let p = getUrlData()
      let iscode = p.idNumber
      if(iscode) {
        self.accessTokenFn()
        window.localStorage.setItem('id', iscode)
        window.sessionStorage.setItem('iscode', iscode)
        self.$toast.show({
          position: 'middle',
          type: 'success',
          message: "自动登录"
        })
        setTimeout(()=> {
          self.nextStep(iscode)
        }, 50)
      }
    },
    loginFn() {
      let self = this
      let s = {
        jyh: "DL1070",
        iscode: this.iscode,
        // password: this.pwd,
        fqsj: "2015-12-12 12:12:12",
        jyfqjd: "YH0001",
        yzm: "AD212DACWEWER232D2EE",
        fqlsh: "20151212000000001",
        jbr: "ABC",
      }
      let str = JSON.stringify([s])
      let da = `####${str}$$$$`
      // let da = `####[{"jyh":"DL1070","jyfqjd":"YH0001","yzm":"AD212DACWEWER232D2EE","fqlsh":"20151212000000001","jbr":"ABC","fqsj":"2015-12-12 12:12:12","iscode":"330621198110148696","password":"000000"}]$$$$`

      let data = {
        inmsg: da
      }
      $.ajax({
        url: path().getInfo,
        data: data,
        type: 'post',
        success: r=> {
          let ret = dataDeal.formJson(r)
          let code = ret[0].retcode
          if(code=="0" || code===0) {
            // 成功
            self.accessTokenFn()
            window.localStorage.setItem('id', self.iscode)
            window.sessionStorage.setItem('iscode', self.iscode)
            self.$toast.show({
              position: 'middle',
              type: 'success',
              message: "登录成功"
            })

            // window.localStorage.setItem('accessToken', 'true')
            setTimeout(()=> {
              self.nextStep(self.iscode)
              // self.loginOutFn()
            }, 50)
          }else if(code=="-1") {
            self.$toast.show(ret[0].retmsg)
          }else {
            return
          }
        }
      })
    },
    nextStep(iscode) {
      // 下一步是否需要补充资料
      if(!this.icon) {
        let self = this
        let s = dataDeal.submitJson({
          jyh: "GR1091",
          iscode: iscode,
        })
        let data = {
          inmsg: s
        }
        $.ajax({
          url: path().getInfo,
          data: data,
          type: 'post',
          success: r=> {
            let ret = dataDeal.formJson(r)
            let code = ret[0].retcode
            if(code=="0" || code===0) {
              // 成功
              sessionStorage.setItem('needInfo', 'no')
              setTimeout(()=> {
                self.$router.push('/home')
              }, 200)
            }else if(code=="-1") {
              self.$toast.show(ret[0].retmsg)
              sessionStorage.setItem('needInfo', 'yes')
              setTimeout(()=> {
                self.$router.push('/info')
              }, 200)
            }else {
              return
            }
          }
        })
      }else {
        this.$emit('close')
      }
    }
  },
  created() {
    const self = this
    let p = getUrlData()
    let iscode = p.idNumber
    if(iscode) {
      this.login3Fn()
    }else {
      this.pageState = 'success'
    }
  },
  mounted() {
    setTimeout(()=> {
      this.showLogin = true
    }, 200)
  }
}
</script>

<style scoped lang="less">
@import "../../init/init.less";
@import url('../../../../../common/style/media.less');
.loginPage_title_top {
  position: relative;
  font-size: 39px;
  color: #7370ff;
  margin-top: 80px;
  margin-bottom: 50px;
  text-align: center;
  &:after {
    content: "";
    color: #7370ff;
    width: 100%;
    position: absolute;
    left: 40px;
    z-index: 2;
    // -webkit-mask-image: -webkit-gradient(linear, right top, left bottom, from(#ff0000), to(rgba(0, 0, 0, 0)));
  }
}
.login_pane {
  position: absolute;
  width: 100%;
  height: 180px;
  padding: 20px;
  top: 140px;
  left: 0;
  box-sizing: border-box;
  .input_item {
    position: relative;
    width: 90%;
    left: 5%;
    margin: 10px 0;
    box-sizing: border-box;
    input {
      // height: 40px;
      .height(45px, 45px, 45px, 45px, 80px, 80px);
      // font-size: 15px;
      .font(16px, 16px, 16px, 16px, 24px, 35px);
      outline: none;
      border: none;
    }
    .countDown_pane {
      position: absolute;
      right: 5px;
      bottom: 12px;
      color: rgb(33, 135, 230)
    }
    &:after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      background: #bcc0ca;
      height: 1px;
      width: 100%;
    }
  }
}
.login {
  width: 90%;
  display: block;
  margin: 30px auto;
  // height: 45px;
  .height(45px, 45px, 45px, 45px, 80px, 80px);
  border: none;
  font-size: 16px;
  .font(16px, 16px, 16px, 16px, 24px, 35px);
  background: #439df8;
  color: #fff;
  font-size: 16px;
  border: none;
  box-shadow: 0 0 10px rgba(70, 120, 231, .6);
}
.login_pwd_tip {
  text-align: center;
  font-size: 12px;
  .font(16px, 16px, 16px, 16px, 24px, 27px);
  margin: 20px 0;
  color: #999;
  &:active {
    color: rgb(252, 184, 21)
  }
}
.social {
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
}
.btm_offset-enter-active, .btm_offset-leave-active {
  transition: all 0.7s ease-out;
}
.btm_offset-enter, .btm_offset-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
.login__footer--tip {
  line-height: 23px;
  color: rgb(198, 2, 2);
  text-align: justify;
}
</style>
