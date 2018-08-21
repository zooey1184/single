<template lang="html">
  <page title="社保业务经办">
    <div class="">
      <div class="middle_pane">
        <div class="item orange_item" @click="goDetail(1)">
          <i class="icon iconfont icon-qiandai icon_font"></i>
          <p>灵活就业人员新增</p>
          <i class="icon iconfont icon-qiandai icon_bg"></i>
        </div>
        <div class="item orange_item" @click="goDetail(2)">
          <i class="icon iconfont icon-baoxian1 icon_font"></i>
          <p>灵活就业人员续保</p>
          <i class="icon iconfont icon-baoxian1 icon_bg"></i>
        </div>
        <!-- <div class="item orange_item" @click="goDetail(3)">
          <i class="icon iconfont icon-baoxianxiaoshou icon_font"></i>
          <p>取消停保业务</p>
          <i class="icon iconfont icon-baoxianxiaoshou icon_bg"></i>
        </div> -->
      </div>

    </div>
  </page>
</template>

<script>
import {mapActions} from 'vuex'

export default {
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
        // this.set_business('个人停保')
      }
      this.$router.push(`/progress_detail?state=${state}`)
    },
  }
}
</script>

<style scoped lang="less">
@import url('../../init/init.less');
@import url('../../../../../common/style/media.less');
.middle_pane {
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item {
  width: 80%;
  overflow: hidden;
  // max-width: 280px;
  // .height(140px, 135px, 135px, 145px, 250px, 280px);
  height: 30%;
  position: relative;
  border-radius: 10px;
  background: #fff;
  box-sizing: 0 0 15px #ddd;
  padding: 15px;
  box-sizing: border-box;
  margin: 20px auto;
  @media screen {
    margin-bottom: 20px;
    @media (min-width: 330px) and (max-width: 369px) {
      margin-bottom: 20px;
    }
    @media (max-width: 329px) {
      margin-bottom: 20px;
    }
    @media (min-width: 400px) {
      margin-bottom: 20px;
    }
    @media (min-width: 650px) {
      margin-bottom: 50px;
    }
    @media (min-width: 950px) {
      margin-bottom: 80px;
    }
  }
  p {
    // font-size: 20px;
    .font(20px, 18px, 18px, 24px, 35px, 45px);
    font-family: "微软雅黑";
    font-weight: normal;
    color: #fff;
    margin-top: 70px;
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
  // font-size: 20px;
  .font(20px, 18px, 18px, 24px, 35px, 60px);
  color: #fdfdfd;
}
.icon_bg {
  position: absolute;
  right: -20px;
  bottom: 20px;
  // font-size: 90px;
  .font(90px, 90px, 90px, 90px, 110px, 140px);
  color: #fa8e8f
}
</style>
