<template lang="html">
<div class="">
  <page title="1">
    <div>
      <div class="">
        <input type="text" name="" v-model="dates" @click="showPick">
      </div>
    </div>
  </page>
  <pick ref="picker" :data="pickDate" :selectedIndex="[0,0,0]" @change="changeFn" @select="selectFn"></pick>
</div>
</template>

<script>
import scroll from '@/components/PageWrap/scroll.vue'
import pick from '@/components/Picker/Picker.vue'
import {mapActions} from 'vuex'
import common from '../mixins/common'
import date from '../mixins/date'

export default {
  components: {
    scroll,
    pick
  },
  data: ()=> ({
    dates: "",

  }),
  mixins: [common, date],
  methods: {
    goTo() {
      this.cr().go()
      this.$router.push('/page')
    },
    showPick() {
      let pick = this.$refs.picker
      pick.show()
    },
    selectFn(i, e, v) {
      console.log(i, e, v);
    }
  },
  created() {
    // console.log(this.$route);
    this.init()
  }
}
</script>

<style lang="css">
</style>
