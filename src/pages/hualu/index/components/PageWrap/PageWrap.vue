<template>
<div class="page__wrap">
  <transition-group name='fade' tag='div'>
    <div class="pageWrap_wrap" v-show="(state=='success' || state=='normal')" :style="{background: bgWrap}" :key="0">
      <div class="pageWrap_header_fixed" :style="{height: `${header_H}px`}" v-if="showHeader && !ua.isGjj">
        <slot name='header'>
          <nav-bar :title="title" :navStyle="navStyle"></nav-bar>
        </slot>
      </div>
      <!-- :style="{top: (showHeader && !ua.isGjj)?`${header_H}px`:0}" -->
      <section class="pageWrap_copntain"  ref='pageWrap_contain'>
        <div class="pageWrap_scroll" ref='pageWrap_scroll'>
          <slot></slot>
        </div>
      </section>
      <div class="pageWrap_footer" v-if="showFooter" :style="{height: `${footer_H}px`}">
        <slot name='footer'></slot>
      </div>
    </div>


    <div class="pageWrap_wrap" v-show="(state=='loading')" :style="{background: '#fff'}" :key="1">
      <loading-page></loading-page>
    </div>
    <div class="pageWrap_wrap" v-show="(state=='fail' || state=='error')" :style="{background: '#fff'}" :key="2">
      <fail-page></fail-page>
    </div>
  </transition-group>
</div>
</template>

<script>
import {isApp} from '@/common/js/business'
import {clientRect} from '@/common/js/base'

export default {
  name: 'page-wrap',
  data: ()=> ({
    ua: isApp()
  }),
  components: {
    NavBar: ()=> import('./NavBar.vue'),
    LoadingPage: () => import('@/components/PageWrap/LoadingPage.vue'),
    FailPage: () => import('@/components/PageWrap/FailPage.vue')
  },
  props:{
    showFooter: {
      type: Boolean,
      default: false
    },
    footer_H: {
      type: Number,
      default: 60
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    header_H: {
      type: Number,
      default: 40
    },
    scrollTo: [Number],
    scrollAnimate: {
      type: Boolean,
      default: false
    },
    bgWrap: {
      type: String,
      default: '#f5f5f5'
    },
    state: {
      type: String,
      default: 'success'
    },
    navStyle: {
      type: Object,
      default: ()=> ({
        background: 'rgb(98, 105, 102)',
        color: '#fff'
      })
    },
    title: [String, Number]
  },
  watch: {
    scrollTo: function(n, o) {
      let self = this
      let sc = this.$refs.pageWrap_contain
      if(this.scrollAnimate){
        try {
          frame()
        } catch (e) {
          sc.scrollTop = n
        } finally {
          return
        }
      }else {
        sc.scrollTop = n
      }
      function frame() {
        let o = sc.scrollTop
        let t = n
        let c = t-o
        let step = c/10
        if(sc.scrollTop != n){
          window.requestAnimationFrame(frame)
          if(Math.abs(step)<1) {
            sc.scrollTop = n
            return
          }else {
            sc.scrollTop += step
          }
        }else {
          return
        }
      }
    }
  },
  methods: {
    scrollFn() {
      let self = this
      let sc = this.$refs.pageWrap_contain
      sc.onscroll = ()=> {
        self.$emit('scroll', sc.scrollTop)
      }
      if(!!self.scrollTo && self.scrollTo!=0) {
        if(this.scrollAnimate){
          try {
            frame()
          } catch (e) {
            sc.scrollTop = self.scrollTo
            return
          } finally {
            return
          }
        }else {
          sc.scrollTop = self.scrollTo
        }
      }
      function frame() {
        let o = sc.scrollTop
        let t = self.scrollTo
        let c = t-o
        let step = c/10
        if(sc.scrollTop != self.scrollTo){
          window.requestAnimationFrame(frame)
          if(Math.abs(step)<1) {
            sc.scrollTop = self.scrollTo
            return
          }else {
            sc.scrollTop += step
          }
        }else {
          return
        }
      }
    },
  },
  created() {
    document.title = this.title || "花鹿"
    let obj = {
      top: 0,
      left: 0,
      width: clientRect().w,
      height: clientRect().h
    }
    if(this.showHeader && !isApp().isGjj) {
      obj.top = this.header_H
    }
    window.localStorage.setItem('pageRect', JSON.stringify(obj))
  },
  mounted() {
    setTimeout(()=> {
      this.scrollFn()
    }, 100)
  }
}
</script>

<style scoped lang="less">
@import url('../../../../../common/style/variable.less');
.page__wrap {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.pageWrap_wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  background: #f5f5f5;
  .pageWrap_header_fixed {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    .pagewrap_header_nav {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      padding: 0 10px;
      justify-content: space-between;
      box-sizing: border-box;
    }
  }
  .pageWrap_copntain {
    position: absolute;
    width: 100%;
    bottom: 0;
    overflow-x: hidden;
    -webkit-overflow-scrolling : touch;
    overflow-y: auto;
    top: 0;
    left: 0;
    .pageWrap_slot {
      display: block;
      position: relative;
    }
  }
  .pageWrap_footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    // overflow: hidden;
    background: @color-t;
  }
  .pageWrap_slot_self {
    position: absolute;
    top: 0;
    z-index: 10;
    width: 100%;
    left: 0;
    height: 100%;
    background: @color-t;
  }
}
.fade-enter-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
