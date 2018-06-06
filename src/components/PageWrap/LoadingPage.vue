<template>
  <div class="PageWrap_circular_wrap">
    <div class="circular_wrap">
      <svg class="circular" viewBox="25 25 50 50" v-if="svg">
        <circle class="path" cx="50" cy="50" r="20" fill="none"/>
      </svg>
      <img v-else class="circular_data" :src="loadImg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    loadImg: '//r.51gjj.com/resource/hualishu/img/ld.png',
  }),
  props: {
    svg: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style lang="less">
.PageWrap_circular_wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
// loading
.circular_wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.circular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}
@keyframes loading-rotate {
  100% {
    transform: rotate(1turn);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px;
  }
}
.circular_data {
  width: 65px;
  animation: loading-rotate-s 1s linear infinite;
}
@keyframes loading-rotate-s {
  100% {
    transform: rotate(-1turn);
  }
}
</style>
