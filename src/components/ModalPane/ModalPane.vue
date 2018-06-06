<template>
  <div class="">
    <transition name="fade">
      <div class="modal_full_page" v-if="modal" :style="{background: background}"></div>
    </transition>
    <transition :name="name">
      <div class="contain_bg_wrap" v-if="modal" @click.stop="toggleFn($event)">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    animationName: 'bounce',
    showModalData: true,
  }),
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: 'bounce'
    },
    background: {
      type: String,
      default: "rgba(0, 0, 0, 0.5)"
    }
  },
  computed: {
    modal: function(){
      let t = false
      if(this.showModal){
        if(this.showModalData){
          t = true
        }else {
          t = false
        }
      }else {
        if(!this.showModalData){
          t = true
        }else {
          t = false
        }
      }
      return t
    }
  },
  methods: {
    toggleFn($event){
      if (!$event.target.classList.contains('contain_bg_wrap')) {
        return;
      }
      this.showModalData = !this.showModal
      this.$emit('closemodal')
    }
  },
}
</script>

<style scoped lang='less'>
@color-t: transparent;
.full_bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: @color-t
}
/*@import url("../animation/common.css");*/
.modal_full_page {
  .full_bg;
  z-index: 98
}
.contain_bg_wrap {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 999;
  .full_bg;
}
/*淡入淡出*/
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/*bounce*/
.bounce-enter-active, .bounce-leave-active {
  transition: all 0.3s ease;
}
.bounce-enter, .bounce-leave-to {
  transform: scale(1.5);
  opacity: 0;
}
/*slide-toggle*/
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
/*scale-toggle*/
.scale-enter-active, .scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter, .scale-leave-to {
  transform: scale(0);
  opacity: 0;
}
/*rotate-toggle*/
.rotate-enter-active, .rotate-leave-active {
  transition: all 0.3s ease;
}
.rotate-enter, .rotate-leave-to {
  transform: rotate(180deg) scale(0.5);
  opacity: 0;
}
</style>
