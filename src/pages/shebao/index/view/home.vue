<template lang="html">
<div>
  <page title="首页" bgWrap="#fff" :showHeader="false">
    <div>
      <div class="banner">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img class="banner_img" src="../../../../assets/1.jpg" alt="">
            </div>
            <div class="swiper-slide">
              <img class="banner_img" src="../../../../assets/2.jpg" alt="">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <div class="home_item_wrap">
        <div class="item" @click="goUrl('/personal_info')">
          <i class="icon icon-info-query iconfont" style="color: rgb(40, 145, 221)"></i>
          <p class="item_font">个人信息</p>
        </div>
        <div class="item" @click="goUrl('/medcial_account')">
          <i class="icon icon-yiyaobaojian iconfont" style="color: rgb(6, 176, 4)"></i>
          <p class="item_font">医保账户</p>
        </div>
        <div class="item" @click="goUrl('/print_index')">
          <i class="icon icon-shebaorenzheng iconfont" style="color: rgb(255, 169, 3)"></i>
          <p class="item_font">参保证明</p>
        </div>
        <div class="item" @click="goUrl('/one_detail/0')">
          <i class="icon icon-shebaochaxun iconfont" style="color: rgb(28, 161, 246)"></i>
          <p class="item_font">社保业务</p>
        </div>
        <div class="item" @click="goUrl('/progress')">
          <i class="icon icon-jindu iconfont" style="color: rgb(255, 116, 3)"></i>
          <p class="item_font">业务进度</p>
        </div>
        <div class="item" @click="goUrl('/info')">
          <i class="icon icon-gerenziliao iconfont" style="color: rgb(28, 161, 246)"></i>
          <p class="item_font">完善资料</p>
        </div>
        <div class="item" @click="goUrl('/social_prove')">
          <i class="icon icon-shebao iconfont" style="color: rgb(255, 116, 3)"></i>
          <p class="item_font">参保证明验证</p>
        </div>

        <div class="item" @click="goUrl('/more')">
          <i class="icon icon-gengduo iconfont" style="color: rgb(176, 176, 176)"></i>
          <p class="item_font">更多</p>
        </div>
      </div>
    </div>
  </page>

  <div class="login_pane" v-if="showWrap">
    <transition name="slide">
      <login v-if="showLogin" :closeIcon="true" @close="closeLogin"></login>
    </transition>
  </div>
</div>
</template>

<script>
export default {
  name: "home-page",
  data: ()=> ({
    showLogin: false,
    showWrap: false
  }),
  components: {
    login: ()=> import ('./login/loginPane.vue')
  },

  methods: {
    swiper() {
      let mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000,//可选选项，自动滑动
        pagination : '.swiper-pagination',
      })
    },
    goUrl(url) {
      if(this.isLogin()) {
        setTimeout(()=> {
          this.$router.push(url)
        }, 120)
      }else {
        // this.$router.push('/login')
        this.showWrap = true
        setTimeout(()=> {
          this.showLogin = true
        }, 20)
      }
    },
    closeLogin() {
      this.showLogin = false
      setTimeout(()=> {
        this.showWrap = false
      }, 500)
    },
    isLogin() {
      let code = sessionStorage.getItem('iscode')
      let id = localStorage.getItem('id')
      let token = localStorage.getItem('accessToken')
      let b = false
      if(!!code || !!id) {
        if(token && token == 'true') {
          b = true
        }
        // b = true
      }else {
        b = false
      }
      return b
    }
  },
  created() {
    // window.localStorage.setItem('id', "330621196609143334")
  },
  mounted() {
    this.swiper()
  }
}
</script>

<style lang="less">
@import url('../../../../common/style/media.less');
/*slide-toggle*/
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}
.banner {
  position: relative;
  width: 100%;
  min-height: 170px;
  // background: rgb(58, 149, 232)
}
.home_item_wrap {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  flex-wrap: wrap;
  margin-top: 5px;
  width: 100%;
  box-sizing: border-box;
  .item {
    // width: 21%;
    .width(25%, 25%, 25%, 25%, 33%);
    display: inline-block;
    text-align: center;
    // margin: 10px -4px;
    margin-top: 3%;
    box-sizing: border-box;
    padding: 5px;
    &:active {
      background: rgba(0,0,0,0.1);
    }
  }
  .item_font {
    // font-size: 13px;
    .font(13px, 13px, 12px, 14px, 22px, 35px);
    transform: scale(.9);
    transform-origin: bottom center;
    white-space: nowrap;
    text-align: center;
    margin-top: 4px;
  }
}
.banner_img {
  width: 100%;
}
.icon {
  // font-size: 25px;
  .font(25px, 25px, 24px, 27px, 40px, 56px);
  text-align: center;
}
.login_pane {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 999;
}
</style>
