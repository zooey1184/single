<template lang="html">
<fail tip="您要找的页面已经移到火星了"></fail>
</template>

<script>
export default {
  components: {
    'fail': ()=> import ('@/components/PageWrap/FailPage.vue')
  },
  data: ()=> ({
    tip: '您要找的页面已经移到火星了'
  }),
  methods: {
    init() {
      let q = this.$router.query
      if(q.code=='404') {
        this.tip = '出错了'
      }
    }
  }
}
</script>

<style lang="css">
</style>
