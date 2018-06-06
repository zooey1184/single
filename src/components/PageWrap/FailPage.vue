<template lang="html">
  <div class="PageWrap_fail_wrap">
    <div class="error_wrap">
      <slot>
        <img src="//r.51gjj.com/image/static/icon-licai-page-kongsjsb.png" alt="">
      </slot>
      <p class="tip">{{tip}}</p>
      <p style="color: rgb(6, 178, 242); margin: 10px 0" @click="refreshFn">点击刷新</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "fail-page",
  props: {
    tip: {
      type: String,
      default: "一定是哪里出错了，才让我们错过"
    },
  },
  methods:{
    refreshFn() {
      window.location.reload()
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
}
.error_wrap {
  position: absolute;
  width: 80%;
  left: 10%;
  top: 100px;
  img {
    width: 40%;
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
