<template lang="html">
<div>
  <page title="首页" bgWrap="#fff" :showHeader="false">
    <div>
      <div class="banner"></div>

      <div class="home_item_wrap">
        <div class="item">
          <i class="icon icon-info-query iconfont" style="color: rgb(40, 145, 221)"></i>
          <p class="item_font">个人信息</p>
        </div>
        <div class="item">
          <i class="icon icon-yiyaobaojian iconfont" style="color: rgb(6, 176, 4)"></i>
          <p class="item_font">医保账户</p>
        </div>
        <div class="item">
          <i class="icon icon-shebaorenzheng iconfont" style="color: rgb(255, 169, 3)"></i>
          <p class="item_font">参保证明</p>
        </div>
        <div class="item">
          <i class="icon icon-shebaochaxun iconfont" style="color: rgb(28, 161, 246)"></i>
          <p class="item_font">社保业务</p>
        </div>
        <div class="item">
          <i class="icon icon-jindu iconfont" style="color: rgb(255, 116, 3)"></i>
          <p class="item_font">业务进度</p>
        </div>
        <div class="item">
          <i class="icon icon-gerenziliao iconfont" style="color: rgb(28, 161, 246)"></i>
          <p class="item_font">完善资料</p>
        </div>
        <div class="item">
          <i class="icon icon-shebao iconfont" style="color: rgb(255, 116, 3)"></i>
          <p class="item_font">社保证明</p>
        </div>
        <div class="item">
          <i class="icon icon-gengduo iconfont" style="color: rgb(176, 176, 176)"></i>
          <p class="item_font">更多</p>
        </div>
      </div>
    </div>
  </page>
</div>
</template>

<script>
export default {
  name: "home-page",

}
</script>

<style lang="less">
.banner {
  position: relative;
  width: 100%;
  min-height: 170px;
  background: rgb(58, 149, 232)
}
.home_item_wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  margin-top: 5px;
  .item {
    width: 20%;
    display: inline-block;
    text-align: center;
    margin: 10px 5px;
  }
  .item_font {
    font-size: 13px;
    transform: scale(.9);
    transform-origin: bottom center;
    white-space: nowrap;
    text-align: center;
    margin-top: 4px;
  }
}
.icon {
  font-size: 25px;
  text-align: center;
}
</style>
