<template lang="html">
  <page bgWrap="#fff" :showHeader="false">
    <div>
      <div v-if="true">
        <transition name='top_offset'>
          <h3 class="loginPage_title" v-if="showLogin">欢迎注册</h3>
        </transition>
      </div>
      <div class="login_pane">
        <div v-if="login_phone">
          <div class="input_item" v-reg:register="{type: 'idCard', test: pageData.iscode, tag: 'iscode'}">
            <input type="text" placeholder="身份证号" v-model="pageData.iscode">
          </div>
          <div class="input_item" v-reg:register="{type: 'realName', test: pageData.psname, tag: 'psname'}">
            <input type="text" placeholder="姓名" v-model="pageData.psname">
          </div>
          <div class="input_item" v-reg:register="{type: 'password', test: pageData.password, tag: 'password'}">
            <input type="password" placeholder="密码" v-model="pageData.password">
          </div>
          <div class="input_item" v-reg:register="{rule: pageData.password, msg: '两次密码不一致', test: pwd, test: pwd, tag: 'pwd'}">
            <input type="password" placeholder="确认密码" v-model="pwd">
          </div>
          <div class="input_item" v-reg:register="{type: 'tel', test: pageData.phone, tag: 'tel'}">
            <input type="text" placeholder="手机号" v-model="pageData.phone">
          </div>
          <div class="input_item" v-reg:register="{type: 'email', test: pageData.email, tag: 'email'}">
            <input type="text" placeholder="邮箱" v-model="pageData.email">
          </div>
        </div>
        <div v-else>
          <div class="input_item">
            <input type="text" placeholder="社保账号（身份证号）">
          </div>
          <div class="input_item">
            <input type="text" placeholder="请输入密码">
          </div>
        </div>

        <button class="btn login" @click="submitFn" v-reg:register.check="{check: check}">注册</button>
        <p class="login_pwd_tip" @click="goLogin">返回登录</p>
      </div>
    </div>
  </page>
</template>

<script>
import {mapActions} from 'vuex'
import path from '@/api/path'
import dataDeal from '../../init/config'
import $ from 'jquery'
import {check} from '@/plugin/VReg/rule'

export default {
  data: ()=>({
    showLogin: false,
    login_phone: true,
    check: false,
    pageData: {
      iscode: "",
      psname: "",
      password: "",
      phone: "",
      email: ""
    },
    pwd: ""
  }),
  mounted() {
    setTimeout(()=> {
      this.showLogin = true
    }, 50)
  },
  methods: {
    ...mapActions([
      'set_login'
    ]),
    goLogin() {
      this.set_login('login')
    },
    submitFn() {
      this.check = true
      if(check('register')) {
        console.log('ok');
      }else {
        setTimeout(()=> {
          this.check = false
        }, 50)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../init/init.less";
.login_wrap {
  height: 100px;
  padding-top: 50px;
}
.loginPage_title {
  position: relative;
  font-size: 39px;
  color: #7370ff;
  margin-top: 50px;
  text-align: center;
  margin-bottom: 50px;
  &:after {
    content: "";
    color: #7370ff;
    width: 100%;
    position: absolute;
    left: 40px;
    z-index: 2;
    -webkit-mask-image: -webkit-gradient(linear, right top, left bottom, from(#ff0000), to(rgba(0, 0, 0, 0)));
  }
}
.login_pane {
  position: absolute;
  width: 100%;
  padding: 20px;
  top: 100px;
  left: 0;
  box-sizing: border-box;
  .input_item {
    position: relative;
    width: 90%;
    left: 5%;
    margin: 10px 0;
    box-sizing: border-box;
    input {
      height: 40px;
      font-size: 15px;
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
  height: 45px;
  border: none;
  font-size: 16px;
  background: #439df8;
  color: #fff;
  font-size: 16px;
  border: none;
  box-shadow: 0 0 10px rgba(70, 120, 231, .6);
}
.login_pwd_tip {
  text-align: center;
  font-size: 12px;
  margin: 10px 0;
  color: rgb(57, 160, 255);
  &:active {
    color: rgb(252, 184, 21)
  }
}
/* 右进 */
.top_offset-enter-active, .top_offset-leave-active {
  transition: all 0.7s ease-out;
}
.top_offset-enter, .top_offset-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
