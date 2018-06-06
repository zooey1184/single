<template>
  <div class="chart_bar_wrap_hor" >
    <div class="chart_bar_contain_hor">
      <!-- <h3 class="title_hor_chart" v-if="title==''">{{title}}</h3> -->
      <div class="chart_item_bar_hor" v-for="(item, index) of barData" :key="index">
        <div class="chart_item_bar_horize" v-if="item.title==''">
          <p>{{item.title}}</p>
          <p>{{item.name}}</p>
        </div>

        <div class="hor_item_chart_wrap">
          <transition name="scaleX">
            <div v-if="showBar" :style="{width: `${item.value*percent}px`, background: item.bg}" class="hor_item_chart_contain"></div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {clientRect} from '@/common/js/base'

export default {
  data: ()=> ({
    // showH: false
  }),
  props: {
    barData: {
      type: Array,
      default: ()=> ([])
    },
    showBar: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 220
    },
    // title: {
    //   type: String,
    //   default: "用户地区分布"
    // }
  },
  computed: {
    percent: function() {
      let h = clientRect().w
      let p = 0.76*h/100
      return p
    }
  },
  mounted() {
    setTimeout(()=> {
      this.showH = true
    }, 3000)
  }
}
</script>

<style lang="less">
.chart_bar_wrap_hor {
  position: relative;
  padding-bottom: 5px;
  width: 100%;
  // left: 5%;
  .title_hor_chart {
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
    margin-bottom: 20px;
  }
  .chart_item_bar_hor {
    margin: 10px 0;
    .chart_item_bar_horize {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8%;
    }
    p {
      font-size: 12px;
    }
    .hor_item_chart_wrap {
      height: 3px;
      width: 84%;
      border-radius: 5px;
      overflow: hidden;
      box-sizing: border-box;
      background: rgba(255,255,255,0.3);

      position: relative;
      left: 8%;
      margin: 3px 0 15px 0;
      .hor_item_chart_contain {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: #d43f44;
        width: 20px
      }
    }
  }
}

.scaleX-enter-active, .scaleX-leave-active {
  transition: all 1s linear;
  transform-origin: 0 50%;
}
.scaleX-enter, .scaleX-leave-to {
  transform: scaleX(0);
  transform-origin: 0 50%;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
