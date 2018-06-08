<template lang="html">
  <div>
    <transition :name="act">
      <register v-if="get_login=='register'"></register>
      <login v-if="get_login=='login'"></login>
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

}
</script>

<style lang='less'>
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
</style>
