<template slot-scope="props">
  <div class="">
    <transition :name="name">
      <div class="verify_item_wrap" v-show="showItem" :class="{underline: getUnderLine || showUnderLine}" :style="{transitionDelay: animateSec, height: `${height}px` }">
        <div class="verify_item_contain_left">
          <div class="verify_item_left_img">
            <slot name="image">
              <!-- 默认图片位置 -->
            </slot>
          </div>
          <div class="verify_item_left_text">
            <div class="text_pane" v-if="self=='text'">
              <h4>{{title}}</h4>
              <p>{{desc}}</p>
            </div>
            <div class="self_pane_slot_wrap" v-else>
              <slot>
                <!-- 默认内容可自定义 -->
              </slot>
            </div>
          </div>
        </div>
        <div class="verify_item_contain_right" v-if="showRight">
          <div class="verify_item_right_text">
            <p :style="{color: (getState==1 ? pickColor : color)}">{{status}}</p>
          </div>
          <div class="verify_item_right_img">
            <img src="//r.51gjj.com/image/static/ico_list_next.png" alt="">
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: "verify-item",
  props: {
    title: [String, Number],
    desc: [String, Number],
    status: [String, Number],
    state: [String, Number],
    self: {
      type: String,
      default: 'self'
    },
    showRight: {
      type: Boolean,
      default: true
    },
    showUnderLine: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 72
    },
    line: {
      type: String,
      default: 'part'
    }
  },
  data: ()=> ({
    node: null,
    color: "#ff7800",
    pickColor: '#868686',
    currentIndex: null,
    name: "fade",
    showItem: false,
  }),
  computed: {
    getState: function() {
      return this.state
    },
    getUnderLine: function() {
      let show = false
      let node = this.$parent.$children.length
      let i = this.getIndex()
      if(node-1>i) {
        show = true
      }else {
        show = false
      }
      return show
    },
    animateSec: function() {
      let i = this.getIndex()
      let s = `${i/10}s`
      return s
    }
  },
  methods: {
    getAttr() {
      let attr = this.$parent.$attrs
      if(!!attr.color) {
        this.color = attr.color
      }
      if(!!attr.name) {
        this.name = attr.name
      }
      if(!!attr.pickColor) {
        this.pickColor = attr.pickColor
      }
    },
    getNode() {
      this.node = this.$parent.$children.length
    },
    getIndex() {
      let node = this.$parent.$children.length
      let frist = 0
      let current = this._uid
      if(node>0) {
        if(!!this.$attrs.index) {
          current = this.$attrs.index
        }else {
          let uid = this.$parent.$children[0]._uid
          frist = uid
        }
      }
      let index = current-frist
      return index
    },
    // 自执行动画
    showFn() {
      setTimeout(()=> {
        this.showItem = true
      }, 10)
    }
  },
  mounted() {
    this.showFn()
    this.getAttr()
    this.getNode()
    this.getIndex()
    if(this.line=='full') {
      document.styleSheets[0].addRule('.underline:after',`left: 0 !important`);
      document.styleSheets[0].addRule('.underline:after', `right: 0 !important`);
    }
  }
}
</script>

<style scoped>
@import url("../../components/Mixin/animate.css");
/* 整体布局 */
.verify_item_wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  background: #fff;
  padding: 0 12px;
}
/* 左侧 */
.verify_item_contain_left {
  display: flex;
  align-items: center;
  line-height: 0;
  flex-grow: 1;
  flex-shrink: 0
}
.verify_item_left_img {
  overflow: hidden;
}
.verify_item_left_img img {
  width: 48px;
  max-height: 48px;
}

.verify_item_left_text {
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
}
.verify_item_left_text h4 {
  font-weight: normal;
  font-size: 16px;
  color: #333;
  line-height: 24px;
}
.verify_item_left_text p {
  color: #868686;
  font-size: 13px;
  line-height: 16px;
}
.self_pane_slot_wrap {
  width: 100%;
}
/* 右侧 */
.verify_item_contain_right {
  display: flex;
  align-items: center;
  line-height: 0
}
.verify_item_right_text p {
  color: #868686;
  font-size: 13px;
}
.verify_item_right_img img {
  height: 12px;
}
/* 下划线 */
.underline {
  position: relative;
}
.underline::after {
  position: absolute;
  content: "";
  bottom: 0;
  left: 72px;
  height: 1px;
  right: 12px;
  transform: scaleY(1);
  transform-origin: 0 0;
  background: #ededed
}
</style>
