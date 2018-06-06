<template>
  <div class="tip__wrap_pane">
    <div class="tip__wrap_pane_contain">
      <slot>
        <img src="//r.51gjj.com/resource/hualishu/images/history_none.png" alt="">
      </slot>
      <slot name='tip'>
        <p>{{title}}</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tip-page',
  props: {
    title: String
  }
}
</script>

<style lang="less">
.tip__wrap_pane {
  position: absolute;
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  .tip__wrap_pane_contain {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    img {
      width: 121px;
    }
    p {
      font-size: 12px;
      margin-top: 20px;
      color: #999;
    }
  }
}
</style>
