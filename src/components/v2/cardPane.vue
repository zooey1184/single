<template>
  <div class="cardItem_wrap">
    <slot>
      <img src="//r.51gjj.com/resource/hualishu/hualuImg/hualu_lg_card14.png" alt="">
    </slot>
    <p class="card_money_pane" v-if="showMoney">￥256</p>
    <div class="card_pane_msg" v-if="showTip">
      <img src="//r.51gjj.com/resource/hualishu/hualuImg/hualu_icon_time.png" alt="">
      <p>剩余10天</p>
    </div>
    <div class="txt_pane">
      <div class="">
        <span class="bigFont">最高可借</span>
        <span class="bigFont_plus">{{money}}</span>
        <span class="bigFont">元</span>
      </div>
      <p class="mid_txt">*日利息低至0.70元</p>
      <p class="right_txt">*3项附加卡权益</p>
    </div>
    <img v-if="isuse" class="modal_lock_card" src="//r.51gjj.com/resource/hualishu/images/modal@2x.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'card-pane',
  props: {
    isuse: {
      type: Boolean,
      default: false
    },
    loan: {
      type: [String, Number],
      default: '4000'
    },
    money: {
      type: [String, Number],
      default: '4000'
    },
    showMoney: {
      type: Boolean,
      default: false
    },
    showTip: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
@import url('../../common/style/media.less');
p, h2, h3, h4, h5, h1 {
  margin: 0;
  padding: 0;
}
.cardItem_wrap {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  img {
    width: 100%;
  }
  .modal_lock_card {
    position: absolute;
    width: 92%;
    top: 2%;
    left: 4%;
  }
  .txt_pane {
    position: absolute;
    left: 30px;
    top: 60px;
    color: #fff;
    .bigFont {
      .font(20px, 18px, 16px, 20px)
    }
    .bigFont_plus {
      .font(30px, 28px, 24px, 30px)
    }
    .mid_txt {
      .margin(20px 0 10px 0, 18px 0 8px 0, 10px 0 5px 0, 20px 0 10px 0);
      .font()
    }
    .right_txt {
      .font()
    }
  }
  .card_money_pane {
    position: absolute;
    right: 32px;
    top: 22px;
    .font(20px, 20px, 18px, 20px);
    color: #fff;
    margin: 0;
  }
  .card_pane_msg {
    position: absolute;
    right: 32px;
    .bottom(40px, 36px, 36px, 57px);
    display: flex;
    align-items: center;
    color: #fff;
    img {
      width: 16px;
      margin: 0 5px
    }
    p {
      .font()
    }
  }
}
</style>
