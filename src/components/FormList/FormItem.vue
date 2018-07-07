<template>
<transition :name="name">
  <div class="f_i_w_v underlineF" v-show="showItem" :style="{transitionDelay: animateSec}">
    <div class="left" :style="leftStyle">
      {{title}}
    </div>
    <div class="middle" :style="middleStyle">
      <div class="form_input__v2">
        <slot>
          <p>{{placeholder}}</p>
        </slot>
      </div>
    </div>
    <div class="right" v-if="showRight" :style="rightStyle">
      <slot name='status'>
        <p>{{status}}</p>
      </slot>
      <slot name='arrow'>
        <!-- <img src="//r.51gjj.com/image/static/ico_list_down.png" alt=""> -->
        <img src="//r.51gjj.com/image/static/ico_list_next.png" alt="">
      </slot>
    </div>
  </div>
</transition>
</template>

<script>
import mixin from '@/common/mixins/list_tpl.js'
import {clientRect} from '@/common/js/base'

export default {
  name: "form-item",
  mixins: [mixin],
  data: () => ({
    node: null,
    color: "#ff7800",
    currentIndex: null,
    name: "fade",
    showItem: false,
  }),
  props: {
    title: [String, Number],
    showRight: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 48
    },
    width: {
      type: Number,
      default: 60
    },
    rightWidth: {
      type: Number,
      default: 20
    },
    status: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
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
    animateSec: function() {
      let i = this.getIndex()
      let s = `${i/10}s`
      return s
    },
    leftStyle: function() {
      let self = this
      let obj = {
        minWidth: `${self.width}px`,
        overflow: 'hidden',

      }
      return obj
    },
    middleStyle: function() {
      let self = this
      let p = clientRect()
      let w = p.w-24-this.width
      if(this.showRight) {
        w = p.w-24-this.width-this.rightWidth
      }
      let obj = {
        width: `${w}px`,
        overflow: 'hidden',
        left: `${this.width+12}px`
      }
      return obj
    },
    rightStyle: function() {
      let self = this
      let obj = {
        overflow: 'hidden',
        width: `${this.rightWidth}px`
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
.height(@m: 48px, @ml:48px, @s:45px, @l: 50px, @xl: 60px, @pc: 70px) {
  @media screen {
    height: @m;
    @media (min-width: 330px) and (max-width: 369px) {
      height: @ml;
    }
    @media (max-width: 329px) {
      height: @s;
    }
    @media (min-width: 400px) {
      height: @l;
    }
    @media (min-width: 650px) {
      height: @xl;
    }
    @media (min-width: 950px) {
      height: @pc;
    }
  }
}
.font(@m:14px, @ml:14px, @s:14px, @l: 16px, @xl: 18px, @pc: 20px) {
  @media screen {
    font-size: @m;
    line-height: @m;
    @media (min-width: 330px) and (max-width: 369px) {
      font-size:  @ml;
      line-height: @ml;
    }
    @media (max-width: 329px) {
      font-size: @s;
      line-height: @s;
    }
    @media (min-width: 400px) {
      font-size: @l;
      line-height: @l;
    }
    @media (min-width: 650px) {
      font-size: @xl;
      line-height: @xl;
    }
    @media (min-width: 950px) {
      font-size: @pc;
      line-height: @pc;
    }
  }
}
.flexBlock {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
}
.form_input__v2 {
  position: absolute;
  width: 100%;
  height: 100%;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: 14px;
    .font(14px, 14px, 14px, 14px, 16px, 30px);
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  p {
    font-size: 14px;
    color: #666;
    // line-height: 14px;
    .font(14px, 14px, 14px, 14px, 16px, 30px);
    margin: 0;
    position: absolute;
    top: 52%;
    transform: translateY(-50%);
    left: 0;
  }
}
.f_i_w_v {
  background: #fff;
  position: relative;
  width: 100%;
  overflow: hidden;
  // height: 48px;
  .height(48px, 48px, 47px, 48px, 60px, 80px);
  padding: 0 12px;
  // display: flex;
  // align-items: center;

  box-sizing: border-box;
  .left {
    .flexBlock;
    position: absolute;
    top: 0;
    left: 12px;
    height: 100%;
    // font-size: 16px;
    .font(14px, 14px, 14px, 14px, 16px, 30px);
  }
  .middle {
    flex-grow: 1;
    flex-shrink: 0;
    .flexBlock;
    position: absolute;
    top: 0;
    height: 100%;
  }
  .right {
    .flexBlock;
    min-width: 20px;
    position: absolute;
    right: 12px;
    top: 0;
    height: 100%;
    justify-content: flex-end;
    img {
      width: 25px;
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
