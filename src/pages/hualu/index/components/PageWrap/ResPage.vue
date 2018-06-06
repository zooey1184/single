<template>
  <div class="result_page__wrap">
    <div v-show="showTop">
      <split-line :width="80">
        <div class="split_pane">
          <img :src="logo" alt="">
          <p>{{name}}</p>
        </div>
      </split-line>
    </div>
    <div class="icon_wrap">
      <slot>
        <img class="circle_pane" src="//r.51gjj.com/image/static/icon-h5-success.png" alt="">
      </slot>
    </div>
    <p class="title_res">{{title}}</p>
    <p class="sub_title">{{sub_title}}</p>
    <div class="desc">
      <slot name="desc">
        <p class="desc_line_one">{{desc}}</p>
        <p class="desc_line_one">{{sub_desc}}
          <span>
            <a href="tel:4008735151">400-873-5151</a>
          </span>
        </p>
      </slot>
    </div>
    <button class="use_btn" @click="goUrl">{{btn}}</button>
  </div>
</template>

<script>
import SplitLine from '@/components/AvgPane/SplitLine.vue'
import path from '@/api/path'

export default {
  name: 'auth-result',
  data: ()=> ({
    name: '花栗鼠',
    logo: '//r.51gjj.com/image/catalog/banklogo/hualishu.png',
    apply_id: ''
  }),
  components: {
    SplitLine
  },
  props: {
    title: {
      type: String,
      default: '恭喜您，已成功'
    },
    showTop: {
      type: Boolean,
      default: false
    },
    isAjax: {
      type: Boolean,
      default: false
    },
    sub_title: {
      type: String,
      default: ''
    },
    desc: [String],
    sub_desc: {
      type: String,
      default: '有任何疑问，请联系客服'
    },
    btn: {
      type: String,
      default: '返回'
    }
  },
  methods: {
    goUrl() {
      this.$emit('change')
    },
    getData() {
      let self = this
      this.$ajax({
        url: path().get_basic_info,
        success: res=> {
          console.log(res);
          if(res.success) {
            self.name = res.ret.name
            self.apply_id = res.ret.apply_id
            self.logo = (res.ret.logo.match(/(http|\/\/)/g))? res.ret.logo:self.logo
          }else {
            self.$toast.show(res.msg)
          }
        },
        error: ()=> {
          // self.pageState = 'error'
        }
      })
    },
  },
  mounted() {
    let self = this
    if(this.showTop && this.isAjax) {
      this.getData()
    }
  }
}
</script>

<style lang="less">
@import url('../../init/init.less');
.result_page__wrap {
  background: #fff;
  padding: 10px;
  .title_res {
    font-size: 24px;
    font-weight: normal;
    text-align: center;
    color: #14b25a;
    // margin-left: 15px;
  }
  .sub_title {
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    color: #333;
    margin: 10px 0;
  }
  .desc_line_one {
    font-size: 12px;
    color: #999;
    text-align: center;
    line-height: 18px;
    margin-bottom: 5px;
    a {
      color: rgb(240, 190, 14);
      &:active {
        color: rgb(245, 100, 18)
      }
    }
  }
}
.split_pane {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 30px;
    margin-right: 10px;
  }
  p {
    font-size: 16px;
    line-height: 18px;
    color: #333;
  }
}
.icon_wrap {
  img {
    width: 109px;
    height: 109px;
    margin: 20px auto;
    display: block;
  }
}
.use_btn {
  .btn;
  width: 60%;
  left: 20%;
  position: relative;
  height: 42px;
  font-size: 18px;
  line-height: 18px;
  margin: 10px 0;
  margin-top: 40px;
  .res_btn
}
</style>
