<template>
  <div class="avgPane_wrap">
    <avg-wrap :active='active' name="slideLeft">
      <avg-item title="信用认证" index="1">
        <img class="icon_img" src="//r.51gjj.com/image/static/icon_xinyong.png" alt="">
      </avg-item>
      <avg-item title="基本信息" index="2">
        <img class="icon_img" src="//r.51gjj.com/image/static/icon_basic.png" alt="">
      </avg-item>
      <avg-item title="芝麻信用授权" index="3">
        <img class="icon_img" src="//r.51gjj.com/image/static/icon_zhima_xinyong.png" alt="">
      </avg-item>
      <avg-item title="绑定银行卡" index="4">
        <img class="icon_img" src="//r.51gjj.com/image/static/icon_bind_card.png" alt="">
      </avg-item>
    </avg-wrap>
  </div>
</template>

<script>
import AvgWrap from './AvgWrap.vue'
import AvgItem from './AvgItem.vue'

export default {
  props: {
    active: {
      type: String,
      default: "1"
    }
  },
  components: {
    AvgWrap,
    AvgItem
  }
}
</script>

<style scoped>
.avgPane_wrap {
  height: 54px;
  padding: 18px 0;
  background: #fff;
}
.icon_img {
  width: 32px;
}
</style>
