<template lang="html">
  <page title="社保业务经办" :state="pageState">
    <div class="">
      <div class="item blue_item" @click="goDetail(1)">
        <i class="icon iconfont icon-qiandai icon_font"></i>
        <p>灵活就业人员新增</p>
        <i class="icon iconfont icon-qiandai icon_bg"></i>
      </div>
      <div class="item blue_item" @click="goDetail(2)">
        <i class="icon iconfont icon-baoxian1 icon_font"></i>
        <p>灵活就业人员续保</p>
        <i class="icon iconfont icon-baoxian1 icon_bg"></i>
      </div>
      <div class="item blue_item" @click="goDetail(3)">
        <i class="icon iconfont icon-baoxianxiaoshou icon_font"></i>
        <p>取消停保业务</p>
        <i class="icon iconfont icon-baoxianxiaoshou icon_bg"></i>
      </div>
    </div>
  </page>
</template>

<script>
import path from '@/api/path'
import dataDeal from '../../init/config'
import $ from 'jquery'
import {mapActions} from 'vuex'

export default {
  data: ()=> ({
    pageData: null,
    pageState: 'success',
    tip: ""
  }),
  methods: {
    ...mapActions([
      'set_business'
    ]),
    goDetail(state) {
      if(state==1) {
        this.set_business('个人新参保')
      }else if(state==2) {
        this.set_business('个人续保')
      }else {
        this.set_business('个人停保')
      }
      this.$router.push(`/social_detail/${state}`)

    },
  }
}
</script>

<style scoped lang="less">
@import url('../../init/init.less');
@import url('../../../../../common/style/media.less');
.item {
  width: 80%;
  overflow: hidden;
  // max-width: 280px;
  .height(140px, 135px, 135px, 145px, 230px, 230px);
  position: relative;
  height: 140px;
  border-radius: 10px;
  background: #fff;
  box-sizing: 0 0 15px #ddd;
  padding: 15px;
  box-sizing: border-box;
  margin: 20px auto;
  p {
    // font-size: 20px;
    .font(20px, 18px, 18px, 24px, 35px, 35px);
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
  .color_linear(rgb(247, 85, 16), rgb(251, 223, 77))
}
.icon_font {
  // font-size: 20px;
  .font(20px, 18px, 18px, 24px, 35px, 45px);
  color: #fdfdfd;
}
.icon_bg {
  position: absolute;
  right: -20px;
  bottom: 20px;
  font-size: 90px;
  color: #80a2f1
}
</style>
