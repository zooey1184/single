<template lang="html">
<div class="">
  <page :showFooter="true">
    <div class="">
      <p class="pane_title">个人信息</p>
      <form-list name="toastSlideUp" v-if='pageData'>
        <form-item title="姓名" :width="120" :showRight="false" :index='1'>
          <p class="account_pane">{{pageData[0].psname}}</p>
        </form-item>
        <form-item title="社会保障号" :width="120" :showRight="false" :index='2'>
          <p class="account_pane">{{pageData[0].pzbh}}</p>
        </form-item>
        <form-item title="性别" :width="120" :showRight="false" :index='3'>
          <p class="account_pane">{{pageData[0].sex==1?"男":"女"}}</p>
        </form-item>
      </form-list>

      <transition name="toastSlideUp">
        <div v-if="pageData && showPage" class="table_pane" style="padding: 20px 0;">
          <v-table
            :width="w"
            :columns="columns"
            :table-data="pageData"
            :show-vertical-border="false">
          </v-table>
        </div>
      </transition>
      <div style="height: 70px;"></div>
    </div>

    <!-- <div slot="footer" class="footer_wrap">
      <button class="btn footer_btn" @click="preview">预览</button>
    </div> -->
  </page>
</div>
</template>

<script>
import path from '@/api/path'
import dataDeal from '../../init/config'
import $ from 'jquery'
import {clientRect} from '@/common/js/base'

export default {
  data: ()=> ({
    pageData: null,
    showPage: false,
    pageState: 'loading',
    columns: [
      {field: 'acyear', title:'年度', width: 40, titleAlign: 'center',columnAlign:'center'},
      {field: 'gtyms', title:'起止年月', width: 105, titleAlign: 'center',columnAlign:'center'},
      {field: 'rewage', title:'月缴基数', width: 55, titleAlign: 'center',columnAlign:'center'},
      {field: 'cpname', title:'缴费单位', titleAlign: 'center',columnAlign:'center'},
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
        jyh: "GR1062",
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
    preview() {
      console.log('none');
    }
  },
  mounted() {
    this.w = clientRect().w
    this.getData()
  }
}
</script>

<style lang="less">
@import url('../../init/footer_btn.less');
.htitle {
  padding: 10px 15px;
  color: #fff;
  background: #d33f33;
  font-size: 16px;
}
.pane_title {
  font-size: 14px;
  color: #999;
  margin: 10px 15px;
}
.account_pane {
  text-align: right;
  width: 100%;
}
.table_pane {
  font-size: 12px;
}
</style>
