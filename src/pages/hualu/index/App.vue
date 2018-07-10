<template>
  <div id="app">
    <transition :name="(`router-${get_pageAction}`)">
      <!-- <keep-alive> -->
        <router-view ref="view"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  data: ()=> ({
    time: 10
  }),
  computed: {
    ...mapGetters([
      'get_pageAction'
    ])
  },
  watch: {
    '$route' (to, from) {
      console.log('router change')
      this.loginOutFn()
    }
  },
  methods: {
    loginOutFn() {
      let loginT = self.time * 60 * 1000
      let t = 0
      let timer = setInterval(()=> {
        t++
        if(t<10) {
          let d = new Date()
          let time = d.getTime()
          let loginTime = localStorage.getItem('loginTime')
          if(loginTime) {
            if(Number.parseInt(loginTime)-time >= 0) {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('loginTime')
              clearInterval(timer)
              return
            }
          }else {
            localStorage.removeItem('accessToken')
            clearInterval(timer)
            return
          }
        }else {
          clearInterval(timer)
        }
      }, loginT)
    },
  }
}
</script>

<style lang="less">
@import url('../../../common/style/index.less');
@import url('../../../common/style/animate.css');
@import url('../../../common/style/media.less');
.router-backward-enter-active,
.router-forward-enter-active,
.router-backward-leave-active,
.router-forward-leave-active {
  will-change: transform;
  transition: all 500ms ease-out;
  height: 100%;
  width: 100%;
  position: absolute;
  backface-visibility: hidden;
}

.router-backward-enter {
  opacity: 1;
  transform: translate3d(-50%, 0, 0);
}

.router-backward-leave-active {
  opacity: 0.5;
  z-index: 2;
  transform: translate3d(100%, 0, 0);
}

.router-forward-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}

.router-forward-leave-active {
  opacity: 0.5;
  transform: translate3d(-50%, 0, 0);
}

.router-fade-enter-active {
  transition: all 0.4s linear;
}
.router-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.router-fade-enter, .router-fade-leave-to {
  opacity: 0;
}
.right_align {
  text-align: right;
  width: 100%;
}
</style>
