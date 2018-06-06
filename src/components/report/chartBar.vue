<template>
  <div class="chart_bar_wrap" :style="{height: `${height}px`}">
    <div class="chart_bar_contain">
      <div class="chart_item_bar" v-for="(item, index) of barData" :key="index">
        <transition name="fade">
          <h3 v-if="showBar" :style="{transitionDelay: `.6s`, color: item.bg}">{{item.name}}</h3>
        </transition>
        <transition name="scaleY">
          <div v-if="showBar" class="chart_item" :style="{height: `${item.value*percent}px`, background: item.bg}"></div>
        </transition>
        <p>{{item.title}}</p>
      </div>
    </div>
    <div class="line_bar_bottom"></div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
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
    }
  },
  computed: {
    percent: function() {
      let h = this.height
      let p = (h-60)/100
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
.chart_bar_wrap {
  position: relative;
  width: 90%;
  height: 220px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 5px #fdfdfd;
  left: 5%;
  .chart_bar_contain {
    position: absolute;
    align-items: flex-end;
    display: flex;
    bottom: 5px;
    justify-content: space-around;
    width: 90%;
    left: 5%;
    .chart_item_bar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        margin-top: 10px;
        font-size: 12px;
      }
      h3 {
        margin-bottom: 5px;
        font-size: 18px;
      }
    }
    .chart_item {
      height: 100px;
      width: 15px;
      background: #d43f33;
    }
  }
  .line_bar_bottom {
    position: absolute;
    bottom: 20px;
    width: 90%;
    height: 5px;
    background: #f8f8f8;
    left: 5%;
    border-radius: 4px;
  }
}

.scaleY-enter-active, .scaleY-leave-active {
  transition: all 0.6s linear;
  transform-origin: 100% 100%;
}
.scaleY-enter, .scaleY-leave-to {
  transform: scaleY(0);
  transform-origin: 100% 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
