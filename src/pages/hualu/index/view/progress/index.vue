<template lang="html">
  <page title="社保业务经办">
    <div class="">
      <div class="item orange_item" @click="goDetail(1)">
        <i class="icon iconfont icon-qiandai icon_font"></i>
        <p>参保新增</p>
        <i class="icon iconfont icon-qiandai icon_bg"></i>
      </div>
      <div class="item orange_item" @click="goDetail(2)">
        <i class="icon iconfont icon-baoxian1 icon_font"></i>
        <p>续保业务</p>
        <i class="icon iconfont icon-baoxian1 icon_bg"></i>
      </div>
      <div class="item orange_item" @click="goDetail(3)">
        <i class="icon iconfont icon-baoxianxiaoshou icon_font"></i>
        <p>参保中断</p>
        <i class="icon iconfont icon-baoxianxiaoshou icon_bg"></i>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  methods: {
    goDetail(state) {
      this.$router.push(`/progress_detail?state=${state}`)
    }
  }
}
</script>

<style scoped lang="less">
@import url('../../init/init.less');
.item {
  width: 80%;
  overflow: hidden;
  max-width: 280px;
  position: relative;
  height: 140px;
  border-radius: 10px;
  background: #fff;
  box-sizing: 0 0 15px #ddd;
  padding: 15px;
  box-sizing: border-box;
  margin: 20px auto;

  p {
    font-size: 20px;
    font-family: "微软雅黑";
    font-weight: normal;
    color: #fff;
    margin-top: 30px;
  }
}
.yello_item {
  .color_linear();
}
.blue_item {
  .color_linear(#a4bdf5, #5281ec)
}
.orange_item {
  .color_linear(#fbb0b1, #f86566)
}
.icon_font {
  font-size: 20px;
  color: #fdfdfd;
}
.icon_bg {
  position: absolute;
  right: -20px;
  bottom: 20px;
  font-size: 90px;
  color: #fa8e8f
}
</style>
