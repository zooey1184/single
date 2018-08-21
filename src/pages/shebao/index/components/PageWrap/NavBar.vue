<template>
  <div class="NAVBAR_header" :style="navStyle">
    <div class="left" @click="back">
      <slot>
        <i class="iconfont icon-back back"></i>
      </slot>
    </div>
    <div class="middle">
      {{title}}
    </div>
    <div class="right">
      <slot name='right'>
        <!-- <i class="iconfont icon-more more"></i> -->
      </slot>
    </div>
  </div>
</template>

<script>
import common from '../../mixins/common'

export default {
  props: {
    title: [String, Number],
    navStyle: {
      type: Object,
      default: ()=> ({
        background: 'rgb(98, 105, 102)',
        color: '#fff'
      })
    },
  },
  mixins: [common],
  methods: {
    back() {
      this.$router.back()
      this.cr().back()
    }
  }
}
</script>

<style scoped lang="less">
.pane {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.NAVBAR_header {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 5px;
  justify-content: space-between;
  margin: 0;
  line-height: 16px;
  z-index: 8;
  .left {
    .pane
  }
  .right {
    .pane
  }
  .middle {
    flex-grow: 1;
    flex-shrink: 0;
    position: relative;
    text-align: center;

  }
  .iconfont {
    &:active {
      color: rgb(55, 57, 51)
    }
  }
}
</style>
