<template>
  <div class="title_pane_wrap">
    <div class="title_bg_pane"></div>
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'title-pane',
  props: {
    title: {
      type: [String, Number],
      default: "会员"
    }
  }
}
</script>

<style scoped lang="less">
.title_pane_wrap {
  background: #fff;
  padding: 18px 15px;
  position: relative;
  display: flex;
  align-items: center;
  .title_bg_pane {
    width: 4px;
    background: #FD6260;
    height: 12px;
    margin-right: 4px;
  }
  p {
    font-size: 16px;
    line-height: 16px;
    margin: 0;
    padding: 0;
  }
}
</style>
