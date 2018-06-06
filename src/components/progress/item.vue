<template>
  <div class="progress_item">
    <div class="point_wrap">
      <div class="point_pane">
        <div class="point" :style="{background: (getAct=='before'|| getAct=='cur')?bg:'#ddd'}"></div>
        <div class="line" v-if="showLine" :style="{background: getAct=='before'?bg:'#ddd'}"></div>
      </div>
      <div class="title">
        <p>{{title}}</p>
      </div>
      <div class="line"></div>
    </div>
    <div class="desc">
      <p>{{desc}}</p>
    </div>
  </div>
</template>

<script>
import mixin from '@/common/mixins/list_tpl.js'

export default {
  props: {
    height: [Number, String],
    title: String,
    desc: String,
    showLine: {
      type: Boolean,
      default: true
    },
    bg: {
      type: String,
      default: "#17a7ee"
    }
  },
  mixins: [mixin],
  computed: {
    getAct() {
      let p = 'before'
      let i = this.getIndex()
      let attr = this.getAttr()

      if(attr.active) {
        let a = attr.active
        console.log(i, a);
        if(i<a) {
          p = 'before'
        }else if(i==a) {
          p = 'cur'
        }else {
          p = 'after'
        }
      }
      return p
    }
  }
}
</script>

<style lang="less">
.progress_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 60px;
  width: 100%;
  background: #fff;
  .point_wrap {
    display: flex;
    align-items: center;
    padding: 0 20px
  }
  .point_pane {
    width: 20px;
    height: 20px;
    border-radius: 30px;
    display: inline-block;
    position: relative;
    z-index: 9;
    .point {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 30px;
      background: #ddd;
    }
    .line {
      position: absolute;
      width: 5px;
      height: 60px;
      content: "";
      top: 10px;
      left: 8px;
      background: rgb(5, 120, 255);
      z-index: -1
    }
  }
  .title {
    display: inline-block;
    margin-left: 10px;
  }
  .desc {
    display: inline-block;
    margin: 0 30px;
  }
}
</style>
