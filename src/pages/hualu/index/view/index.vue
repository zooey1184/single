<template lang="html">
<page title="1">
  <scroll>
    <ul>
      <li v-for="(item, index) in 100" :key="index" @click="goTo">{{item}}</li>
    </ul>
  </scroll>
</page>
</template>

<script>
import scroll from '@/components/PageWrap/scroll.vue'
import {mapActions} from 'vuex'
import common from '../mixins/common'

export default {
  components: {
    scroll
  },
  mixins: [common],
  methods: {
    goTo() {
      this.cr().go()
      this.$router.push('/page')
    }
  },
  created() {
    // console.log(this.$route);
  }
}
</script>

<style lang="css">
</style>
