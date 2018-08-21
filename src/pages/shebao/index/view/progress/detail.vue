<template>
<div>
  <page>
    <div>
      <div class="progress_wrap">
        <v-progress :active="active">
          <item title="开始" :desc='tip.start' :index="1"></item>
          <item title="业务受理" :desc='tip.sec' :index="2"></item>
          <item title="业务办理" :desc='tip.thr' :index="3"></item>
          <item title="完成" :desc='tip.last' :index="4" :showLine="false"></item>
        </v-progress>
      </div>
    </div>
  </page>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import path from '@/api/path'
import dataDeal from '../../init/config'
import $ from 'jquery'

export default {
  components: {
    vProgress: ()=> import ('@/components/progress/progress.vue'),
    item: ()=> import ('@/components/progress/item.vue')
  },
  data: ()=> ({
    pageData: null,
    pageState: 'success',
    tip: {
      start: "",
      sec: "",
      thr: "",
      last: ""
    },
    state: "",
    active: 1,
  }),
  computed: {
    ...mapGetters([
      'get_business'
    ])
  },
  watch: {
    get_business: function(n, o) {
      this.getData()
    }
  },
  methods: {
    getData() {
      let d = new Date()
      let self = this
      // let s = dataDeal.submitJson({
      //   jyh: "GR1051",
      //   // iscode: "342901198010101756",
      //   iscode: window.localStorage.getItem('id'),
      //   psname: window.sessionStorage.getItem('psname'),
      //   ptywlsh: d.getTime()
      // })
      let s = dataDeal.submitJson({
        iscode: "342901198010101756",
        psname: "姚振东",
        ptywlsh: "201704260002",
        gnmc: this.get_business
        // gnmc: "this.get_business"
      })
      let data = {
        inmsg: s
      }
      $.ajax({
        url: path().progress,
        data: data,
        type: 'post',
        success: r=> {
          let ret = JSON.parse(r)

          if(ret.length>0 && ret[0].iscode) {
            self.stateFn(ret[0].ywzt)
          }else {
            self.$toast.show("出错了")
          }
        }
      })
    },
    stateFn(state) {
      let s = 0
      if(state<7) {
        s = state+1
      }
      this.active = s
      if(s==1) {
        this.tip.start = '撤销受理'
      }else if(s==2) {
        this.tip.sec = '受理中'
      }else if(s==3) {
        this.tip.thr = '代办中'
      }else if(s==4) {
        this.tip.last = '正常办结'
      }else if(s==5) {
        this.tip.last = '异常办结'
      }else if(s==6) {
        this.tip.last = '办结撤销'
      }else {
        this.active = 1
        this.tip.start = '不在受理中'
      }
    },
    submitFn() {

    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less">
.progress_wrap {
  position: relative;
  width: 94%;
  left: 3%;
  border-radius: 5px;
  overflow: hidden;
  margin: 30px 0;
  box-shadow: 0 0 15px #ddd;
}
</style>
