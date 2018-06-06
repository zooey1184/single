<template>
  <div class="avgPane_wrap">
    <avg-wrap :active='active' name="slideLeft">
      <avg-item title="人脸识别" index="1">
        <img class="icon_img" src="//r.51gjj.com/image/static/icon_pawn_face.png" alt="">
      </avg-item>
      <div class="middle_line"></div>
      <avg-item title="绑定银行卡" index="2">
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
.middle_line {
  width: 1px;
  height: 40px;
  border-left: 1px dotted rgba(224,224,224,1)
}
.icon_img {
  width: 32px;
}
</style>
