<!-- 个人信息查询 -->
<template lang="html">
<div>
  <page :showFooter="true" :state="pageState" :tip="tip">
    <div>
      <div v-if="pageData">
        <p class="pane_title">个人信息</p>
        <form-list name="rightOffset">
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
      <transition name="rightOffset">
        <div v-if="pageData && showPage" style="padding: 20px 0;">
          <v-table
            :width="w"
            :columns="columns"
            :table-data="pageData"
            :show-vertical-border="false">
          </v-table>
        </div>
      </transition>
    </div>
    <div slot="footer" class="footer_wrap">
      <button class="btn footer_btn" @click="searchFn">个人缴费明细</button>
      <div class="btn_group">
        <button class="btn text_btn">上一页</button>
        <button class="btn text_btn">下一页</button>
      </div>
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
              }, 800)
            }else if(code==="-1") {
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
.pane_title {
  font-size: 14px;
  color: #999;
  margin: 10px 15px;
}
.account_pane {
  text-align: right;
  width: 100%;
}
.footer_wrap {
  background: #fff;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btn {
  display: inline-block;
  height: 42px;
  outline: none;
  border: none;
  font-size: 16px;
}
.footer_btn {
  background: rgb(31, 126, 238);
  color: #fff;
  padding: 0 10px;
  &:active {
    opacity: 0.8
  }
}
.btn_group {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text_btn {
  background: rgba(0,0,0,0);
  min-width: 85px;
  &:active {
    background: #ddd
  }
}
</style>
