<template lang="html">
<div>
  <page title="医保账户信息查询" :showFooter="true" :state="pageState" :tip="tip">
    <div v-if="pageData">
      <div>
        <p class="pane_title">个人信息</p>
        <form-list name="rightOffset">
          <form-item title="身份证号" :width="120" :showRight="false" :index="0">
            <p class="account_pane">{{pageData[0].iscode}}</p>
          </form-item>
          <form-item title="姓名" :width="120" :showRight="false" :index='1'>
            <p class="account_pane">{{pageData[0].psname}}</p>
          </form-item>
        </form-list>
      </div>
      <div>
        <p class="pane_title">账户信息</p>
        <form-list name="rightOffset">
          <form-item title="个人编号" :width="120" :showRight="false" :index='2'>
            <p class="account_pane">{{pageData[0].ybh}}</p>
          </form-item>
          <form-item title="当年个账余额" :width="120" :showRight="false" :index="3">
            <p class="account_pane">{{pageData[0].dnye}}</p>
          </form-item>
          <form-item title="历年个账余额" :width="120" :showRight="false" :index="4">
            <p class="account_pane">{{pageData[0].lnye}}</p>
          </form-item>
          <form-item title="截止到目前医保累计余额" :width="180" :showRight="false" :index="5">
            <p class="account_pane">{{pageData[0].ye}}</p>
          </form-item>
        </form-list>
      </div>
    </div>

    <div class="footer_wrap" slot="footer">
      <button class="footer_btn btn" @click="submitFn">确定</button>
    </div>
  </page>
</div>
</template>

<script>
import path from '@/api/path'
import dataDeal from '../../init/config'
import $ from 'jquery'

export default {
  components: {
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue')
  },
  data: ()=> ({
    pageData: null,
    pageState: 'loading',
    tip: ""
  }),
  methods: {
    getData() {
      let self = this
      let s = dataDeal.submitJson({
        jyh: "GR1020",
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
    submitFn() {
      window.history.back()
    }
  },
  created() {
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
  padding: 0 10px;
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
  width: 94%;
  display: block;
  margin: 0 auto;
  color: #fff;
  padding: 0 10px;
  &:active {
    opacity: 0.8
  }
}
</style>
