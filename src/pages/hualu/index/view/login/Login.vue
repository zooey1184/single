<template lang="html">
  <page bgWrap="#fff" :showHeader="false">
    <div>
      <div v-if="true">
        <!-- <transition name='radiusNone'>


        </transition> -->
        <div class="login_wrap">
          <h3 class="loginPage_title">欢迎登录</h3>
        </div>
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
            <input type="text" placeholder="社保账号（身份证号）">
          </div>
          <div class="input_item">
            <input type="text" placeholder="请输入密码">
          </div>
        </div>

        <button class="btn login">登录</button>
        <p class="login_pwd_tip">没有账号？去注册</p>
        <split-line>
          <p>其他登陆方式</p>
        </split-line>


      </div>
    </div>
  </page>
</template>

<script>
export default {
  components: {
    countDown: ()=> import ('@/components/CountDown/CountDown.vue'),
    splitLine: ()=> import ('@/components/AvgPane/SplitLine.vue')
  },
  data: ()=>({
    showLogin: false,
    login_phone: true
  }),
  mounted() {
    setTimeout(()=> {
      this.showLogin = true
    }, 50)
  }
}
</script>

<style lang="less">
@import "../../init/init.less";
.login_wrap {
  position: relative;
  background: #439df8;
  height: 260px;
  padding-top: 180px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  top: -150px;
  box-sizing: border-box;
}
.radiusNone-enter-active, .radiusNone-leave-active {
  transition: all 0.7s linear;
}
.radiusNone-enter, .radiusNone-leave-to {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  height: 200px;
  padding-top: 100px;
}
.loginPage_title {
  position: relative;
  font-size: 39px;
  color: #fff;
  margin-bottom: 50px;
  text-align: center;
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
  height: 180px;
  padding: 20px;
  top: 180px;
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
</style>
