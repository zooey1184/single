<template>
  <!-- 均分模块 -->
  <div class="avg_pane_wrap" :style="{width: width}">
    <transition :name="name">
      <div class="avg_item" v-if="showPane" :style="{transitionDelay: animateSec }">
        <div class="avg_item_img">
          <slot>
            <img src="//r.51gjj.com/image/static/icon_zhima_xinyong.png" alt="">
          </slot>
        </div>
        <p class="avg_item_title" :style="{color: getNode_c==index?'#000':'#666'}" :class="{active_avg_item: getNode_c==index}">{{title}}</p>
      </div>
  </transition>
  </div>
</template>

<script>
import mixin from '@/components/Mixin/list.js'

export default {
  name: "avg-item",
  data: ()=> ({
    active: null,
    name: "fade",
    showPane: false,
    width: "25%"
  }),
  mixins: [mixin],
  computed: {
    getNode_c: function() {
      let attr = this.getAttr()
      if(!!attr.active) {
        this.active = attr.active
      }else {
        this.active = 1
      }
      return this.active
    },
    animateSec: function() {
      let i = this.getIndex()
      let s = `${i/10}s`
      return s
    },

  },
  props: {
    title: {
      type: [String, Number],
      default: "标题"
    },
    index: [String, Number]
  },
  mounted() {
    let a = this.getAttr()
    if(!!a.name) {
      this.name = a.name
    }
    this.animateFn()
    this.getWidth()
  },
  methods: {
    animateFn() {
      setTimeout(()=> {
        this.showPane = true
      }, 50)
    },
    getWidth() {
      let node = this.getNode()
      let width = "50%"
      this.width = `${Math.floor(100/node)}%`
    }
  }
}
</script>

<style scoped>
@import url("../../components/Mixin/animate.css");
.avg_pane_wrap {
  /* width: 25%; */
}
.avg_item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avg_item_img img {
  width: 32px;
}
.avg_item_title {
  font-size: 12px;
  color: #666;
  line-height: 18px;
}
.active_avg_item {
  /* font-size: 13px; */
  font-weight: 800
}
</style>
