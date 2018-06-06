<template>
  <div>
    <transition name="fade_scoped">
      <div class="modal_full_page" v-if="showToast" :style="{background: background}"></div>
    </transition>
    <transition :name="animate">
      <div class="contain_bg_wrap" v-show="showToast" :style="{transitionDelay: '50ms'}">
        <div class="contain_bg_contain">
          <h4>{{title}}</h4>
          <p class="desc">{{msg}}</p>
          <div class="btn_group" v-if='btnFn'>
            <!-- <p v-for="(item, index) in btn" @touchstart="touchEntFn(index)" @touchend="touchindex=99" :class="{activeOpa: (touchindex==index), lastBtn: showBtnLine(index)}" @click="actionFn(item, index)" :key="index">{{item}}</p> -->
            <p v-for="(item, index) in btn" :class="{ lastBtn: showBtnLine(index)}" @click="actionFn(item, index)" :key="index">{{item}}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'alert',
  data: ()=> ({
    // position: 'middle',
    animate: 'fade_scoped',
    showToast: false,
    title: '提示',
    msg: '提示',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.3)',
    w_icon: '//r.51gjj.com/act/release/img/wraning.png',
    e_icon: '//r.51gjj.com/act/release/img/error.png',
    s_icon: '//r.51gjj.com/act/release/img/success.png',
    l_icon: '//r.51gjj.com/act/release/img/loading_img.gif',
    img_icon: '',
    showIcon: false,
    type: "",
    btn: [],
    showBtn: false,
    toJSON: '',
    touchindex: 99
  }),
  props: {

  },
  computed: {
    btnFn: function(){
      let b = this.btn
      if(b.length>0) {
        this.showBtn = true
      }else {
        this.showBtn = false
      }
      return this.showBtn
    },
  },
  methods: {
    actionFn(item, index) {
      if(item.match(/(cancle|取消|关闭|放弃)/g)) {
        this.cancleFn()
      }else {
        if(item.match(/(confirm|确定|提交|确认)/g)) {
          this.confirmFn()
          return
        }else if(index===0 && this.btn.length>1) {
          this.cancleFn()
          return
        }else{
          this.confirmFn()
          return
        }
      }
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    },
    showBtnLine(index) {
      let l = this.btn.length
      let b = true
      if(index+1>=l) {
        b = false
      }
      return b
    },
    cancleFn() {
      console.log('this is from vue');
    },
    confirmFn() {
      console.log('this is from confirmFn');
    },
    touchEntFn(d) {
      this.touchindex = d
    }
  }
}
</script>

<style lang='less'>
/*@import url("../animation/common.css");*/
@color-t: transparent;
.full_bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: @color-t;
  z-index: 99999;
}
.modal_full_page {
  .full_bg;
}
.activeOpa {
  background: rgba(212, 231, 236, 0.8)
}
.contain_bg_wrap {
  overflow: hidden;
  z-index: 999;
  .full_bg;
  .contain_bg_contain {
    position: absolute;
    width: 64%;
    left: 18%;
    top: 34%;
    border-radius: 12px;
    overflow: hidden;
    // background: #f8f8f8;
    background: rgba(240, 245, 243, 1);
    // box-shadow: 1px 1px 5px #ccc;
    h4 {
      font-size: 14px;
      color: #333;
      font-family: "微软雅黑";
      width: 100%;
      text-align: center;
      padding: 10px 0;
      padding-top: 20px;
      line-height: 18px;
      margin: 10px 0;
      padding: 0;
    }
    .desc {
      line-height: 18px;
      font-size: 12px;
      padding: 0 10px;
      margin-bottom: 10px;
      color: #666;
      min-height: 30px;
      text-align: center;
    }
    .btn_group {
      display: flex;
      position: relative;
      width: 100%;
      height: 40px;
      font-size: 14px;
      align-items: center;
      &:before {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 1px;
        background: #ddd;
        content: "";
        transform: scaleY(0.5);
        transform-origin: 0 0;
      }
      p {
        flex-grow: 1;
        flex-shrink: 0;
        font-size: 15px;
        text-align: center;
        color: rgb(43, 112, 245);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .lastBtn {
        position: relative;
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: #ddd;
          transform: scaleX(0.5);
          transform-origin: 0 0;
          content: ""
        }
      }
      .blodFont {
        font-weight: 600
      }
    }
  }
}
.fade_scoped-enter-active, .fade_scoped-leave-active {
  transition: all 0.5s ease-out;
}
.fade_scoped-enter, .fade_scoped-leave-to {
  opacity: 0;
}
.slideBottom-enter-active, .slideBottom-leave-active {
  transition: all 0.3s linear;
}
.slideBottom-enter, .slideBottom-leave-to {
  transform: translateY(15px);
  opacity: 0;
}
.scaleBottom-enter-active, .scaleBottom-leave-active {
  transition: all 0.3s linear;
}
.scaleBottom-enter, .scaleBottom-leave-to {
  transform: translateY(15px) scale(0.9);
  opacity: 0;
}
.slidetop-enter-active, .slidetop-leave-active {
  transition: all .3s linear;
}
.bounce_sm-enter, .bounce_sm-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
.bounce_sm-enter-active, .bounce_sm-leave-active {
  transition: all .3s ease-out;
}
</style>
