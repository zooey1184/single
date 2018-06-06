<template>
<transition :name="name">
  <div class="f_i_w underlineF" v-show="showItem" :style="{transitionDelay: animateSec, height: `${height}px` }">
    <div class="left" :style="leftStyle">
      {{title}}
    </div>
    <div class="middle">
      <div class="form_input" v-if="formType=='input'">
        <slot></slot>
      </div>
    </div>
    <div class="right" v-if="showRight">
      <slot name='status'>
        <p>{{status}}</p>
      </slot>
      <slot name='arrow'>
        <img src="//r.51gjj.com/image/static/ico_list_down.png" alt="">
      </slot>
    </div>
  </div>
</transition>
</template>

<script>
import mixin from '@/components/Mixin/list.js'

export default {
  name: "form-item",
  mixins: [mixin],
  data: () => ({
    node: null,
    color: "#ff7800",
    currentIndex: null,
    name: "fade",
    showItem: false,
    showPlaceHolder: true,
    showSelect: false,
    bindValue: '',
    deviceName: 'android'
  }),
  props: {
    title: [String, Number],
    formType: {
      type: String,
      default: 'input'
    },
    showRight: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 48
    },
    line: {
      type: Object,
      default: () => ({
        left: 0,
        right: 0
      })
    },
    width: {
      type: Number,
      default: 60
    },
    state: [Number, String],
    status: [Number, String],
    placeholder: [String, Number],
    value: [String, Number],
    selectData: {
      type: [Array, Object],
      default: () => ([])
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getUnderLine: function() {
      let show = false
      let node = this.$parent.$children.length
      let i = this.getIndex()
      if (node - 1 > i) {
        show = true
      } else {
        show = false
      }
      return show
    },
    device() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.deviceName = 'ios'
      } else {
        this.deviceName = 'android'
      }
      return this.deviceName
    },
    animateSec: function() {
      let i = this.getIndex()
      let s = `${i/10}s`
      return s
    },
    leftStyle: function() {
      let self = this
      let obj = {
        minWidth: `${self.width}px`
      }
      return obj
    }
  },
  methods: {
    // 自执行动画
    showFn() {
      setTimeout(() => {
        this.showItem = true
      }, 10)
    },
  },
  mounted() {
    try {
      let attr = this.getAttr()
      this.name = attr.name || 'fade'

      this.showFn()
    } catch (e) {
      console.log(e);
    } finally {
      return
    }
  }
}
</script>

<style lang="less">
// @import url("../../common/style/animate.css");
.flexBlock {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  // overflow: hidden;
}
.form_input {
  position: relative;
  width: 100%;
  height: 100%;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: 14px;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
}
.f_i_w {
  background: #fff;
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 48px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .left {
    .flexBlock;
  }
  .middle {
    flex-grow: 1;
    flex-shrink: 0;
    .flexBlock;
    // .form_input,
    // .form_select {
    //   position: relative;
    //   width: 100%;
    //   height: 100%;
    //   top: 0;
    //   left: 0;
    //   font-size: 14px;
    //   input {
    //     position: absolute;
    //     width: 100%;
    //     height: 100%;
    //     top: 0;
    //     left: 0;
    //     font-size: 14px;
    //     border: none;
    //     outline: none;
    //     margin: 0;
    //     padding: 0;
    //     -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    //   }
    //   .placeholder_style {
    //     position: absolute;
    //     height: 100%;
    //     display: flex;
    //     align-items: center;
    //     color: #999;
    //     width: 100%;
    //     left: 0;
    //   }
    //   select {
    //     position: absolute;
    //     width: 125%;
    //     top: 0;
    //     left: -5px;
    //     height: 48px;
    //     font-size: 14px;
    //     border: none;
    //     outline: none;
    //     padding: 0;
    //     margin: 0;
    //     opacity: 0;
    //     -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    //   }
    // }
  }
  .right {
    .flexBlock;
    min-width: 20px;
    justify-content: flex-end;
    img {
      width: 15px;
    }
  }
}

/* 下划线 */
.underlineF {
    position: relative;
}
.underlineF::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    height: 1px;
    right: 0;
    transform: scaleY(1);
    transform-origin: 0 0;
    background: #ededed;
}
</style>
