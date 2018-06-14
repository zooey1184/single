<template lang="html">
  <page title="个人参保证明打印">
    <div class="">
      <div class="item yello_item" @click="goDetail(1)">
        <i class="icon iconfont icon-qiandai icon_font"></i>
        <p>社会保险参保证明</p>
        <i class="icon iconfont icon-qiandai icon_bg"></i>
      </div>
      <div class="item yello_item" @click="goDetail(2)">
        <i class="icon iconfont icon-baoxian1 icon_font"></i>
        <p>历年养老参保证明</p>
        <i class="icon iconfont icon-baoxian1 icon_bg"></i>
      </div>
      <div class="item yello_item" @click="goDetail(3)">
        <i class="icon iconfont icon-baoxianxiaoshou icon_font"></i>
        <p>养老待遇证明</p>
        <i class="icon iconfont icon-baoxianxiaoshou icon_bg"></i>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  methods: {
    goDetail(state) {
      if(state==1) {
        this.go_sh()
      }else if(state==2) {
        this.go_ln()
      }else if(state==3) {
        this.go_yl()
      }
    },
    go_sh() {
      this.$router.push('/print_sh')
    },
    go_ln() {
      this.$router.push('/print_ln')
    },
    go_yl() {
      this.$router.push('/print_yl')
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
  .color_linear(rgb(235, 207, 137), #ffb630);
}
.blue_item {
  .color_linear(#a4bdf5, #5281ec)
}
.orange_item {
  .color_linear(rgb(247, 85, 16), rgb(251, 223, 77))
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
  color: #face5c
}
</style>
