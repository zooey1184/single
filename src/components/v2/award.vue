<template>
  <div class="award_wrap">
    <div class="line_top">
      <div class="award_item award_item1">
        <div class="award_item_pane">
          <img src="//r.51gjj.com/resource/hualishu/img/20180409_ad_1.png" alt="">
        </div>
        <div class="award_item_model" v-if="active==0"></div>
      </div>
      <div class="award_item award_item2">
        <div class="award_item_pane">
          <img src="//r.51gjj.com/resource/hualishu/img/20180409_ad_2.png" alt="">
        </div>
        <div class="award_item_model" v-if="active==1"></div>
      </div>
      <div class="award_item award_item3">
        <div class="award_item_pane">
          <img src="//r.51gjj.com/resource/hualishu/img/20180409_ad_3.png" alt="">
        </div>
        <div class="award_item_model" v-if="active==2"></div>
      </div>
    </div>
    <div class="line_top">
      <div class="award_item award_item4">
        <div class="award_item_pane">
          <img src="//r.51gjj.com/resource/hualishu/img/20180409_ad_8.png" alt="">
        </div>
        <div class="award_item_model" v-if="active==7"></div>
      </div>
      <div class="award_item award_item5" @click="startFn">
        <div class="award_item_pane cover_pane">
          <img v-if="( (award!='0' || award>0) && state=='start' )" src="//r.51gjj.com/resource/hualishu/img/20180409_award_btn_start.png" alt="">
          <img v-if="(award=='0' || award===0)" src="//r.51gjj.com/resource/hualishu/img/20180409_award_btn_stop.png" alt="">
          <img v-if="( (award!='0' || award>0) && state=='ing' )" src="//r.51gjj.com/resource/hualishu/img/20180409_award_btn_start.png" alt="">
        </div>
      </div>
      <div class="award_item award_item6">
        <div class="award_item_pane">
          <img src="//r.51gjj.com/resource/hualishu/img/20180409_ad_4.png" alt="">
        </div>
        <div class="award_item_model" v-if="active==3"></div>
      </div>
    </div>
    <div class="line_top">
      <div class="award_item award_item7">
        <div class="award_item_pane">
          <img src="//r.51gjj.com/resource/hualishu/img/20180409_ad_7.png" alt="">
        </div>
        <div class="award_item_model" v-if="active==6"></div>
      </div>
      <div class="award_item award_item8">
        <div class="award_item_pane">
          <img src="//r.51gjj.com/resource/hualishu/img/20180409_ad_6.png" alt="">
        </div>
        <div class="award_item_model" v-if="active==5"></div>
      </div>
      <div class="award_item award_item9">
        <div class="award_item_pane">
          <img style="width: 90%; height: 90%; margin-left: 4%" src="//r.51gjj.com/resource/hualishu/img/20180409_award_5.png" alt="">
        </div>
        <div class="award_item_model" v-if="active==4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalPane from '@/components/ModalPane/ModalPane.vue'

export default {
  name: 'award-pane',
  data: ()=> ({
    active: 10,
    r: 4,      // 转盘圈数
    d: 8,      // 定格位置，从1开始
    n: "*",
    rolling: false,
    state: 'start',
  }),
  props: {
    // 可抽奖次数
    award: {
      type: [Number, String],
      default: 0,
    }
  },
  methods: {
    activeFn(x, t=7000, s, callback) {
      // 定格体 显示高亮
      setTimeout(()=> {
        this.active = x
        setTimeout(()=> {
          if(s==0){
            let y = '2'
            switch(x){
              case 0:
              y = 16
              break;
              case 1:
              y = 4
              break;
              case 2:
              y = 20
              break;
              case 3:
              y = 10
              break;
              case 4:
              y = 2
              break;
              case 5:
              y = 8
              break;
              case 6:
              y = 6
              break;
              case 7:
              y = 30
              break
            }
            this.money = y
            callback()
          }
        }, 300)
      }, t)
    },
    rollFn(r=4, d=0) {
      // 循环体 触发转盘
      // let sum = 8*this.r+this.d
      // let shift = 8*this.r+this.d
      let sum = 8*r+d
      let shift = 8*r+d
      let time = 50
      let act = 0
      for(let i=0; i<sum; i++){
        shift--
        time += 60
        if(shift-i<8*2){
          time = Math.floor(time*1.05)
        }
        act = i%8
        this.activeFn(act, time, shift, ()=> {
          console.log('ok')
          this.showModal = !this.showModal
          // this.$emit('callFn')
          this.getFn()
          this.rolling = false
        })
      }
    },
    getFn() {
      // 抽奖次数
      let _this = this
      // Business.ajax({
      //   url: '/invest2/lottery/QueryLotteryRecord/lotteryTime',
      //   data: {},
      //   success: (d) => {
      //     if(d.resCode==1){
      //       _this.n = d.resData.lotteryTime
      //     }
      //     console.log("getFn")
      //   },
      //   error: (e) => {
      //     console.log(e)
      //   }
      // })
    },
    handleDate(showTip = "hide", start = "Thu Nov 23 2017 00:00:00 GMT+0800 (中国标准时间)", end = "Mon Nov 27 2017 23:59:59 GMT+0800 (中国标准时间)") {
      let _this = this
      let t = 'pre'
      let startT = start
      let endT = end
      let cookie = document.cookie
      if (cookie.match(/auth_token/g)) {
        startT = (!!_this.startTime) ? _this.startTime.replace(/\-/g, '\/') : start
        endT = (!!_this.endTime) ? _this.endTime.replace(/\-/g, '\/') : end
      }
      let dateS = new Date(startT)
      let dateOri = new Date(endT)
      let dateSt = dateS.getTime()
      let dateEt = dateOri.getTime()
      let today = new Date().getTime()
      let duration = 1000 * 60 * 60 * 24 * 2
      if (today < dateSt) {
        t = "pre"
      } else if (today >= dateSt && today < dateEt) {
        t = 'current'
      } else if (today >= dateEt && today < (dateEt + duration)) {
        t = 'after'
      } else if (today > (dateEt + duration)) {
        t = 'over'
      }
      return t
    },
    startFn() {
      // 抽奖
      let _this = this
      _this.rollFn(3, _this.d)
      // let t = this.handleDate()
      let t = 'current'
      if(t=='current'){
        _this.rolling = true
        _this.rollFn(3, _this.d)
      //   if(this.loginStatusFn()) {
      //     if(!this.rolling) {
      //       _this.rolling = true
      //       Business.ajax({
      //         url: '/invest2/lottery/QueryLotteryRecord/lottery',
      //         data: {},
      //         success: (d) => {
      //           if(d.resCode==1){
      //             let type = d.resData.type
      //             switch(type){
      //               case "20":
      //               _this.d = 5
      //               break;
      //               case "19":
      //               _this.d = 2
      //               break;
      //               case "18":
      //               _this.d = 7
      //               break;
      //               case "17":
      //               _this.d = 6
      //               break;
      //               case "16":
      //               _this.d = 4
      //               break;
      //               case "15":
      //               _this.d = 1
      //               break;
      //               case "14":
      //               _this.d = 3
      //               break;
      //               case "13":
      //               _this.d = 8
      //               break;
      //             }
      //             _this.rollFn(3, _this.d)
      //           }else {
      //             _this.$toast.show(d.resMsg)
      //             _this.rolling = false
      //           }
      //         },
      //         error: (e) => {
      //           console.log(e)
      //           _this.rolling = false
      //         }
      //       })
      //     }else {
      //       console.log('rolling')
      //     }
      //   }
      }else if(t=='pre'){
        this.$toast.show("活动还没开始呢")
      }else if(t=='over' || t=='after') {
        this.$toast.show("客官您来晚了")
      }
    },
    exchange(callback) {
      // let _this = this
      // Business.ajax({
      //   url: "/app/invest/v2",
      //   type: "POST",
      //   data: {
      //     "login": "true"
      //   },
      //   success: function(d) {
      //     console.log(d)
      //     setTimeout(()=> {
      //       console.log('callback')
      //       _this.getFn()
      //     }, 20)
      //   },
      //   error: function(e) {
      //     console.log(e)
      //   }
      // })
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="less">
@import url('../../../common/style/media.less');
.award_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #f9aa3f;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .line_top {
    display: flex;
    align-items: center;
    justify-content: center;
    .award_item {
      // width: 70px;
      .width(70px, 65px, 60px, 70px);
      .height(70px, 65px, 60px, 70px);
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      margin: 7px;
      .award_item_pane {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
      }
      img {
        width: 100%;
        height: 94%;
      }
      .cover_pane {
        img {
          height: 100%;
        }
      }
    }
  }
}
</style>
