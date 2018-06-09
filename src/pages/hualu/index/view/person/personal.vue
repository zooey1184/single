<!-- 个人信息查询 -->
<template lang="html">
<div class="">
  <page :showFooter="true">
    <div class="">

    </div>
    <div slot="footer" class="footer_wrap">
      <button class="btn footer_btn">个人缴费明细</button>
      <div class="btn_group">
        <button class="btn text_btn">上一页</button>
        <button class="btn text_btn">下一页</button>
      </div>
    </div>
  </page>
</div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.footer_wrap {
  background: #fff;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btn {
  display: inline-block;
  height: 42px;
  outline: none;
  border: none;
  font-size: 16px;
}
.footer_btn {
  background: rgb(31, 126, 238);
  color: #fff;
  padding: 0 10px;
  &:active {
    opacity: 0.8
  }
}
.btn_group {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text_btn {
  background: rgba(0,0,0,0);
  min-width: 85px;
  &:active {
    background: #ddd
  }
}
</style>
