<template lang="html">
  <div class="PageWrap_fail_wrap">
    <div class="error_wrap">
      <slot>
        <img src="./404.png" alt="">
      </slot>
      <p class="tip">{{tip==""?"请求出错，请稍后再试": tip}}</p>
      <p style="color: rgb(6, 178, 242); margin: 10px 0" @click="backFn" v-if="showBack">返回</p>
      <p style="color: rgb(6, 178, 242); margin: 10px 0" v-else @click="refreshFn">点击刷新</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "fail-page",
  props: {
    tip: {
      type: String,
      default: "请求出错，请稍后再试"
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    refreshFn() {
      window.location.reload()
    },
    backFn() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="less">
// fail
.PageWrap_fail_wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
}
.error_wrap {
  position: absolute;
  width: 80%;
  left: 10%;
  top: 100px;
  img {
    width: 100%;
    display: block;
    margin: 0 auto;
  }
  p {
    text-align: center;
    line-height: 24px;
  }
  .tip {
    font-size: 14px;
    color: #999;
    margin: 20px 0;
  }
}
</style>
