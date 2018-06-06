<template>
  <!-- 状态模块  结果页的图片和两行描述信息，图片路径和描述信息科配置 -->
  <!-- <state-tip src="..." :desc1="..." :desc2="..." ></state-tip> -->
  <div class="page_wrap">
    <div class="space"></div>
    <img :src="src" alt=""/>
    <p class="desc" v-text="desc1"></p>
    <p class="desc" v-text="desc2"></p>
  </div>
</template>

<script>
export default {
  name: 'StateTip',
  data() {
    return {

    }
  },
  props: {
    src: {
      type: [String],
      default: "https://r.51gjj.com/image/static/periodization_result_succsee_20171229.png"
    },
    desc1: {
      type: [String],
      default: '暂无信息'
    },
    desc2: {
      type: [String],
      default: ''
    }
  },
  mounted: function() {
    // this.load = true;
  }
}
</script>
<style scoped>
.step_bar_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
.space{
  width: 100%;
  height: 0.87rem;
}
img{
  display: block;
  width: 2rem;
  height:2rem;
  margin:0.3rem auto;
}
p{
  font-size: 0.36rem;
  line-height: 0.56rem;
  text-align: center;
  color:#333;
}
</style>
