<!-- 个人信息查询 -->
<template lang="html">
<div class="fullpage">
  <page :showFooter="true" :state="pageState" :tip="tip">
    <div>
      <div v-if="pageData">
        <p class="pane_title">个人信息</p>
        <form-list name="toastSlideUp">
          <form-item title="姓名" :width="120" :showRight="false">
            <p class="account_pane">{{pageData[0].psname}}</p>
          </form-item>
          <form-item title="身份证号" :width="120" :showRight="false">
            <p class="account_pane">{{pageData[0].iscode}}</p>
          </form-item>
          <form-item title="医保卡状态" :width="120" :showRight="false">
            <p class="account_pane">{{pageData[0].cardstat}}</p>
          </form-item>
          <form-item title="单位社保编号" :width="120" :showRight="false">
            <p class="account_pane">{{pageData[0].cpcode}}</p>
          </form-item>
          <form-item title="参保单位" :width="120" :showRight="false">
            <p class="account_pane">{{pageData[0].cpname}}</p>
          </form-item>
        </form-list>
      </div>
      <transition name="toastSlideUp">
        <div v-if="pageData && showPage" style="padding: 20px 0;">
          <v-table
            :width="w"
            :columns="columns"
            :table-data="pageData"
            :show-vertical-border="false">
          </v-table>
        </div>
      </transition>
      <div style="height: 120px;"></div>
    </div>
    <div slot="footer" class="footer_wrap">
      <button class="btn footer_btn" @click="searchFn">个人缴费明细</button>
    </div>
  </page>
</div>
</template>

<script>
import path from '@/api/path'
import dataDeal from '../../init/config'
import $ from 'jquery'
import {clientRect} from '@/common/js/base'

export default {
  data:()=> ({
    pageState: 'loading',
    tip: "",
    pageData: null,
    showPage: false,
    pdcodeList: [],
    columns: [
      {field: 'pdcode', title:'险种', width: 120, titleAlign: 'center',columnAlign:'center'},
      {field: 'rewage', title:'缴费基数', width: 100, titleAlign: 'center',columnAlign:'center'},
      {field: 'aac031', title:'险种状态',titleAlign: 'center',columnAlign:'center'},
    ],
    w: 300,
  }),
  components: {
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue')
  },
  methods: {
    getData() {
      let self = this
      let s = dataDeal.submitJson({
        jyh: "GR1010",
        // iscode: "350921199101200012",
        iscode: window.localStorage.getItem('id')
      })
      let data = {
        inmsg: s
      }
      $.ajax({
        url: path().getInfo,
        data: data,
        type: 'post',
        success: r=> {
          let ret = dataDeal.formJson(r)
          let code = ret[0].retcode
          if(code) {
            if(code==="0") {
              // 成功
              self.pageData = ret
              if(ret[0].psname) {
                window.sessionStorage.setItem('psname', ret[0].psname)
              }
              setTimeout(()=> {
                self.pageState = 'success'
              }, 20)
              setTimeout(()=> {
                self.showPage = true
              }, 900)
            }else if(code=="-1") {
              self.$toast.show(ret[0].retmsg)
              self.pageState = 'error'
              self.tip = ret[0].retmsg || ""
            }else {
              self.pageState = 'success'
              return
            }
          }else {
            self.pageState = 'error'
          }
        }
      })
    },
    searchFn() {
      this.$router.push('/personal_search')
    }
  },
  created() {
    this.w = clientRect().w
    this.getData()
  }
}
</script>

<style lang="less">
@import url('../../init/footer_btn.less');
.pane_title {
  font-size: 26px;
  color: #999;
  margin: 20px 15px;
}
.account_pane {
  text-align: right;
  width: 100%;
}
.columnCellClass {
  height: 60px;
}
// td {
//   height: 60px;
// }
</style>
