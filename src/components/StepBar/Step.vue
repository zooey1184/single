<template slot-scope="props">
<div class="step_wrap" :class="{alignRight: (alignData=='right'), alignCenter: (alignData=='center')}">
  <div class="step_contain">
    <div class="step_circle" :style="{
      borderColor: ((index==activeFn) || ((index<activeFn) && (index==node) )) ? color: (index<activeFn ? color : border),
      background: ((index==activeFn) || ((index<activeFn) && (index==node))) ? color: '#fff',
      }">
      <slot name="edit" v-if="( index==activeFn )">
        <img  class="icon_img" src="//r.51gjj.com/image/static/20160518-bank-icon-edit.png" alt="edit">
      </slot>
      <slot name="check" v-if="( (index<activeFn) && (index<node) )">
        <img class="icon_img" src="//r.51gjj.com/image/static/20160518-bank-icon-cur2.png" alt="check">
      </slot>
      <slot name="ok" v-if="( (index<activeFn) && (index==node) )">
        <img style="width: 16px; height: 16px" class="icon_img" src="//r.51gjj.com/image/static/20160518-bank-icon-ok.png" alt="ok">
      </slot>
    </div>
    <div class="line" v-if="showLine" :style="{width: width, left: leftPx, borderTopColor: (index<activeFn)?color:border}" :class="{active_line: ((index)<activeFn)}"></div>
  </div>
  <p class="step_title" :style="{color: (index<=activeFn) ? color : '#b9b9b9'}">{{ title }}</p>
</div>
</template>

<script>
export default {
  data: () => ({
    showLine: true,
    width: "100px",
    node: "1",
    active: "0",
    alignData: "left",
    leftPx: '15px',
    color: "#439df8"
  }),
  props: {
    index: {
      type: [String, Number],
      default: "1"
    },
    title: {
      type: String,
    },
    border: {
      type: String,
      default: "#e5e5e5"
    },
  },
  computed: {
    activeFn() {
      return this.$parent.active
    }
  },
  methods: {
    getNode() {
      let node = this.$parent.$children.length
      this.node = node
      if (this.index >= node) {
        this.showLine = false
      }
    },
    getWidth() {
      let width = this.$parent.width
      let node = this.$parent.$children.length
      let slot = this.$parent.$refs.steps.getBoundingClientRect().width
      let attr = this.$parent.$attrs
      if (!!attr.align) {
        if (attr.align == 'center') {
          let w = Math.floor(slot / (node - 1))
          if (node < 4) {
            w = w * 0.9
            this.width = `${w}px`
            this.leftPx = '15px'
            console.log(this.leftPx);
          } else {
            this.width = `${w}px`
            this.leftPx = '15px'
          }
        } else if (attr.align == 'right') {
          let w = Math.floor(slot / (node - 1))
          this.width = `${w}px`
          this.leftPx = '27px'
        } else if (attr.align == 'left') {
          let w = Math.floor(slot / (node - 1))
          this.width = `${w}px`
          this.leftPx = '0'
        }
      } else {
        let w = Math.floor(slot / (node - 1))
        this.width = `${w}px`
        this.leftPx = '0'
      }
    },
    pramasFn() {
      let attr = this.$parent.$attrs
      if (!!attr.align) {
        this.alignData = attr.align
      }
      if(!!attr.color) {
        this.color = attr.color
      }
    }
  },
  created() {

  },
  mounted() {
    this.pramasFn()
    this.getNode()
    this.getWidth()
  }
}
</script>

<style scoped>
.step_circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 20px;
  border: 2px solid #e5e5e5;
  font-size: 12px;
  text-align: left;
  position: relative;
  background: #fff;
  z-index: 9;
  overflow: hidden;
}

.step_wrap {
  position: relative;
}

.step_contain {
  position: relative;
}

.step_title {
  margin: 0;
  padding: 0;
  font-size: 12px;
  line-height: 20px;
  color: #b9b9b9;
  margin-top: 6px;
}

.next_step {
  position: relative;
}

.next_step::after {
  position: absolute;

}

.line {
  height: 1px;
  position: absolute;
  top: 50%;
  border: none;
  border-top: 1px solid #ddd;
  /* transform: translateY(-50%) scaleY(0.5); */
}

.active {
  border: 2px solid #439df8;
  background: #439df8
}

.active_color {
  color: #439df8;
}

.active_line {
  border-top: 1px solid #439df8;
  border-bottom: 1px solid rgba(0, 0, 0, 0)
}

.active_box {
  border: 2px solid #439df8;
}

/* align */

.alignLeft {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.alignCenter {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.alignRight {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* icon */

.icon_img {
  width: 12px;
  height: 12px;
}
</style>
