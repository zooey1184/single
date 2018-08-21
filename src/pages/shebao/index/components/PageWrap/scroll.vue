<!-- 当前组件选自滴滴组件scroll, 做了一些修改 -->
<template>
<div ref="wrapper" class="list-wrapper" :style="{height: `${minH}px`}">
  <div class="scroll-content">
    <div ref="listWrapper">
      <slot></slot>
    </div>

    <div v-if="pullUpLoad">
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
  </div>


  <div v-if="pullDownRefresh">
    <slot name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle" :beforePullDown="beforePullDown" :isPullingDown="isPullingDown" :bubbleY="bubbleY">
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading_scroll">
            <loading></loading>
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Loading from './loading.vue'
import Bubble from './bubble.vue'
const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
import {clientRect} from '@/common/js/base'

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: '',
      bubbleY: 0,
      minH: '100%',
      toJSON: ()=> {},
    }
  },
  computed: {
    pullUpTxt() {
      const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || "查看更多"
      const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || "没有更多"
      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt() {
      return this.pullDownRefresh && this.pullDownRefresh.txt || "刷新成功！"
    },

  },
  created() {
    this.pullDownInitTop = -50
    if(this.pullDownRefresh) {
      this.pullDownStyle = `top:${(-50)}px`
    }
  },
  mounted() {

    setTimeout(() => {
      let h = this.getRect('listWrapper').height
      let p = clientRect()
      // this.minH = p.h>=h ? `${h-1}` : p.h
      let s = window.localStorage
      let offset = 0
      if(!!s.pageRect && JSON.parse(s.pageRect)) {
        let ss = JSON.parse(s.pageRect)
        offset = ss.top
      }
      this.minH = p.h-offset
      this.initScroll()
    }, 50)
  },
  methods: {
    // 初始化处理
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${this.getRect('wrapper').height + 1}px`
      }
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
      }
      this.scroll = new BScroll(this.$refs.wrapper, options)
      // 滚动
      if (this.listenScroll) {

        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
          console.log(pos);
        })
      }
      // 上下拉刷新监听滚动
      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })
      }
      // 是否下拉刷新处理
      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }
      // 是否上拉加载
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    // 获取元素dom
    getRect(ref) {
      let r = this.$refs[ref].getBoundingClientRect()
      return r
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    // 重新计算scroll
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    destroy() {
      this.scroll.destroy()
    },
    // 当无新数据的时候需要调用，以结束当前上下刷新加载
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        this.pullUpDirty = dirty
        this.refresh()
      } else {
        this.refresh()
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pullingDown')
      })
      this.scroll.on('scroll', (pos) => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true
        this.$emit('pullingUp')
      })
    },
    _reboundPullDown() {
      const {
        stopTime = 600
      } = this.pullDownRefresh
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true)
      }, this.refreshDelay)
    }
  },
  components: {
    Loading,
    Bubble
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .list-wrapper
    position: relative
    // height: 100%
    // overflow: hidden
    // background: #fff
    .scroll-content
      position: relative
      z-index: 1
    .list-content
      position: relative
      z-index: 10
      background: #fff
      .list-item
        height: 60px
        line-height: 60px
        font-size: 18px
        padding-left: 20px
        border-bottom: 1px solid #e5e5e5
  .pulldown-wrapper
    position: absolute
    width: 100%
    left: 0
    display: flex
    justify-content center
    align-items center
    transition: all
    .after-trigger
      margin-top: 10px
  .pullup-wrapper
    width: 100%
    display: flex
    justify-content center
    align-items center
    padding: 16px 0
</style>
