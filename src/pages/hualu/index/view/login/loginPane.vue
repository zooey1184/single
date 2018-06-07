<template lang="html">
  <div>
    <transition name="scaleT">
      <register v-if="tpl=='register'"></register>
      <login v-if="tpl=='login'"></login>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    login: ()=> import ('./Login.vue'),
    register: ()=> import ('./Register.vue')
  },
  data: ()=> ({
    tpl: 'login'
  }),
  created() {
    setTimeout(()=> {
      this.tpl = 'register'
    }, 3000)
  }
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
</style>
