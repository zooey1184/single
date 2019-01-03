<template>
  <page title="社保业务经办" :state="pageState">
    <div class="">
      <div class="middle_pane">
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
        <div class="item blue_item" @click="goMain(2)">
          <i class="icon iconfont icon-shebao icon_font"></i>
          <p>灵活就业人员中断</p>
          <i class="icon iconfont icon-shebao icon_bg"></i>
        </div>
        <div class="item blue_item" @click="goMain(3)">
          <i class="icon iconfont icon-baoxianxiaoshou icon_font"></i>
          <p>灵活就业人员新增</p>
          <div class="desc">( 附带当年补缴 )</div>
          <i class="icon iconfont icon-baoxianxiaoshou icon_bg"></i>
        </div>
        <div class="item blue_item" @click="goMain(4)">
          <i class="icon iconfont icon-baoxian icon_font"></i>
          <p>灵活就业人员续保</p>
          <div class="desc">( 附带当年补缴 )</div>
          <i class="icon iconfont icon-baoxian icon_bg"></i>
        </div>
        
        <div class="item blue_item" @click="goMain(5)">
          <i class="icon iconfont icon-info-query icon_font"></i>
          <p>医疗险种 ( 增加 )</p>
          <i class="icon iconfont icon-info-query icon_bg"></i>
        </div>
        <div class="item blue_item" @click="goMain(6)">
          <i class="icon iconfont icon-yiyaobaojian icon_font"></i>
          <p>医疗险种 ( 减少 )</p>
          <i class="icon iconfont icon-yiyaobaojian icon_bg"></i>
        </div>
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
        // this.set_business('个人停保')
      }
      this.$router.push(`/social_detail/${state}`)

    },
    goMain(state) {
      // console.log('object');
      this.set_business(state)
      this.$router.push(`/one_detail/${state}`)
    }
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
  justify-content: flex-start;
}
.item {
  width: 80%;
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 1;
  // max-width: 280px;
  // .height(140px, 135px, 135px, 145px, 250px, 280px);
  height: 20%;
  position: relative;
  border-radius: 10px;
  background: #fff;
  box-sizing: 0 0 15px #ddd;
  padding: 15px;
  box-sizing: border-box;
  margin: 20px auto;
  @media screen {
    margin-bottom: 20px;
  }

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
  p {
    // font-size: 20px;
    .font(20px, 18px, 18px, 24px, 35px, 45px);
    font-family: "微软雅黑";
    font-weight: normal;
    color: #fff;
    margin-top: 30px;
    line-height: 35px;
  }
  .desc {
    color: #fafafa;
    margin-top: 10px;
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
  .font(20px, 18px, 18px, 24px, 35px, 60px);
  color: #fdfdfd;
}
.icon_bg {
  position: absolute;
  right: -20px;
  bottom: 20px;
  // font-size: 90px;
  .font(90px, 90px, 90px, 90px, 110px, 140px);
  color: #80a2f1
}
</style>
