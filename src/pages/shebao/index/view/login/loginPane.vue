<template lang="html">
  <div class="fullpage">
    <i class="icon-close1 icon iconfont" v-if="closeIcon" @click="closeFn"></i>
    <transition :name="act">
      <register v-if="get_login=='register'"></register>
      <login v-if="get_login=='login'" :icon="closeIcon" @close="closeFn"></login>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  components: {
    login: ()=> import ('./Login.vue'),
    register: ()=> import ('./Register.vue')
  },
  computed: {
    ...mapGetters([
      'get_login'
    ])
  },
  props: {
    closeIcon: {
      type: Boolean,
      default: false
    }
  },
  data: ()=> ({
    act: 'scaleT'
  }),
  watch: {
    get_login: function(n, o) {
      if(n=='login') {
        this.act = 'scaleC'
      }else {
        this.act = 'scaleT'
      }
    }
  },
  methods: {
    closeFn() {
      this.$emit('close')
    }
  }
}
</script>

<style lang='less'>
@import url('../../../../../common/style/media.less');
.fullpage {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
}
.scaleT-enter-active, .scaleT-leave-active {
  transition: all 0.4s linear;
}
.scaleT-enter {
  transform: scale(1.5);
  opacity: 0;
}
.scaleT-leave-to {
  transform: scale(0);
  opacity: 0;
}
.scaleC-enter-active, .scaleC-leave-active {
  transition: all 0.4s linear;
}
.scaleC-enter {
  transform: scale(0);
  opacity: 0;
}
.scaleC-leave-to {
  transform: scale(1.5);
  opacity: 0;
}
.icon-close1 {
  font-size: 20px;
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 999;
}
</style>
