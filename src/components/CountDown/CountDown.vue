<template>
  <div class="countDown_wrap">
    <div class="countDown_tipPane" v-if="showTime"  @click="tabGetCode">
      <slot>
        <p>获取验证码</p>
      </slot>
    </div>
    <div class="countDown_timePane" v-else>
      {{t}}s
    </div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    showTime: true,
    t: null
  }),
  props: {
    time: {
      type: [String, Number],
      default: 60
    },
    state: {
      type: [Boolean],
      default: false
    }
  },
  watch: {
    state: function(n, o) {
      if(n) {
        console.log('可以了');
        this.t = this.time
        this.showTime = false
        let timer = setInterval(()=> {
          if(this.t>0) {
            this.t--
          }else {
            clearInterval(timer)
            this.t = this.time
            this.showTime = true
          }
        }, 1000)
      }else {
        console.log('还不行');
      }
    }
  },
  methods: {
    tabGetCode() {
      this.$emit('change')
      if(this.state) {
        this.t = this.time
        this.showTime = false
        let timer = setInterval(()=> {
          if(this.t>0) {
            this.t--
          }else {
            clearInterval(timer)
            this.t = this.time
            this.showTime = true
          }
        }, 1000)
      }else {
        console.log('还不行');
      }
    }
  }
}
</script>

<style scoped>
.countDown_timePane {
  font-size: 15px;
}
</style>
