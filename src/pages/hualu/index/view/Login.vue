<template lang="html">
  <page bgWrap="#fff">
    <div>
      <div v-if="true">
        <transition name='left_offset'>
          <h3 class="loginPage_title" v-if="showLogin"></h3>
        </transition>
      </div>
      <div class="login_pane">
        <div class="input_item">
          <input type="text" placeholder="手机号">
        </div>
        <div class="input_item">
          <input type="text" placeholder="手机验证码">
          <div class="countDown_pane">
            <count-down></count-down>
          </div>
        </div>

        <button class="btn login">登录</button>
        <p class="login_pwd_tip">密码登录</p>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  components: {
    countDown: ()=> import ('@/components/CountDown/CountDown.vue')
  },
  data: ()=>({
    showLogin: false,
  }),
  mounted() {
    setTimeout(()=> {
      this.showLogin = true
    }, 50)
  }
}
</script>

<style lang="less">
@import "../init/init.less";
.loginPage_title {
  position: relative;
  font-size: 39px;
  color: #439df8;
  margin-top: 81px;
  margin-bottom: 50px;
  margin-left: 40px;
  &:before {
    content: "欢迎登录，";
  }
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
  background: rgb(33, 135, 230);
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
.left_offset-enter-active, .left_offset-leave-active {
  transition: all 0.7s ease-out;
}
.left_offset-enter, .left_offset-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
