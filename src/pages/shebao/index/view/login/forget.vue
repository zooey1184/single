<template lang="html">
  <page bgWrap="#fff" :showHeader="false" title="重置密码">
    <div>
      <div v-if="true">
        <transition name='left_offset'>
          <h3 class="loginPage_title" v-if="showLogin">重置密码</h3>
        </transition>
      </div>
      <div class="login_pane">
        <div>
          <div class="input_item">
            <input type="text" placeholder="手机号">
          </div>
          <div class="input_item">
            <input type="text" placeholder="手机验证码">
            <div class="countDown_pane">
              <count-down></count-down>
            </div>
          </div>
          <div class="input_item">
            <input type="text" placeholder="密码">
          </div>
          <div class="input_item">
            <input type="text" placeholder="确认密码">
          </div>
        </div>

        <button class="btn login">提交</button>

      </div>
    </div>
  </page>
</template>

<script>
export default {
  components: {
    countDown: ()=> import ('@/components/CountDown/CountDown.vue'),
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
  height: 100px;
  padding-top: 50px;
}
.loginPage_title {
  position: relative;
  font-size: 39px;
  color: #7370ff;
  margin-top: 50px;
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
.left_offset-enter-active, .left_offset-leave-active {
  transition: all 0.7s ease-out;
}
.left_offset-enter, .left_offset-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
