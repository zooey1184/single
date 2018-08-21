<template lang="html">
<div class="">
  <page :showFooter="true">
    <div class="">
      <p class="pane_title">个人信息</p>
      <form-list name="toastSlideUp" v-if='pageData'>
        <form-item title="姓名" :width="120" :showRight="false" :index='1'>
          <p class="account_pane">{{pageData[0].psname}}</p>
        </form-item>
        <form-item title="身份证号" :width="120" :showRight="false" :index='2'>
          <p class="account_pane">{{pageData[0].iscode}}</p>
        </form-item>
        <form-item title="性别" :width="120" :showRight="false" :index='3'>
          <p class="account_pane">{{pageData[0].sex}}</p>
        </form-item>
      </form-list>

      <transition name="toastSlideUp">
        <p v-if="pageData" class="pane_title" :style="{transitionDelay: '.4s'}">当前险种状态</p>
      </transition>

      <form-list name="toastSlideUp" v-if='pageData'>
        <form-item :title="item.pdcodejb" :width="120" :showRight="false" :index='4+index' v-for="(item, index) in insurList" :key="index">
          <p class="account_pane">{{item.aac031}}</p>
        </form-item>
      </form-list>

      <transition name="toastSlideUp">
        <p v-if="pageData" class="pane_title" :style="{transitionDelay: '.8s'}">缴纳情况</p>
      </transition>
      <form-list name="toastSlideUp" v-if='pageData'>
        <form-item title="单位名称" :width="120" :showRight="false" :index='10'>
          <p class="account_pane">{{pageData[0].cpnamejf}}</p>
        </form-item>
        <form-item title="单位编号" :width="120" :showRight="false" :index='11'>
          <p class="account_pane">{{pageData[0].cpcodejf}}</p>
        </form-item>
        <form-item title="起始年月" :width="120" :showRight="false" :index='11'>
          <p class="account_pane">{{pageData[0].stym.substr(0,4)}}年-{{pageData[0].stym.substr(4, 6)}}月</p>
        </form-item>
        <form-item title="终止年月" :width="120" :showRight="false" :index='11'>
          <p class="account_pane">{{pageData[0].edym.substr(0,4)}}年-{{pageData[0].edym.substr(4, 6)}}月</p>
        </form-item>
        <form-item title="月数" :width="120" :showRight="false" :index='11'>
          <p class="account_pane">{{pageData[0].months}}个月</p>
        </form-item>
      </form-list>

      <transition name="toastSlideUp">
        <p v-if="pageData" class="pane_title" :style="{transitionDelay: '1.1s'}">最后24个月缴费变动记录</p>
      </transition>
      <transition name='toastSlideUp'>
        <div v-if="pageData" :style="{transitionDelay: '1.4s'}">
          <div v-for="(item, index) in pageData" :key="index">
            <h3 class="htitle">{{item['to_char(ysym)'].substr(0,4)}}年{{item['to_char(ysym)'].substr(4, 6)}}月</h3>
            <form-list name="toastSlideUp" v-if='pageData'>
              <form-item title="缴纳类型" :width="120" :showRight="false" :index='10'>
                <p class="account_pane">{{item.jfflg}}</p>
              </form-item>
              <form-item title="缴纳情况" :width="120" :showRight="false" :index='11'>
                <p class="account_pane">{{item.ftflg}}</p>
              </form-item>
              <form-item title="养老保险缴纳基数" :width="120" :showRight="false" :index='11'>
                <p class="account_pane">{{item.rewage01}}</p>
              </form-item>
              <form-item title="养老保险个人缴纳" :width="120" :showRight="false" :index='11'>
                <p class="account_pane">{{item.psarfd01}}</p>
              </form-item>
              <form-item title="医保缴纳基数" :width="120" :showRight="false" :index='11'>
                <p class="account_pane">{{item.rewage02}}</p>
              </form-item>
              <form-item title="医保个人缴纳" :width="120" :showRight="false" :index='11'>
                <p class="account_pane">{{item.psarfd02}}</p>
              </form-item>
              <form-item title="失业保险缴纳基数" :width="120" :showRight="false" :index='11'>
                <p class="account_pane">{{item.rewage03}}</p>
              </form-item>
              <form-item title="失业保险个人缴纳" :width="120" :showRight="false" :index='11'>
                <p class="account_pane">{{item.psarfd03}}</p>
              </form-item>
            </form-list>
          </div>
        </div>
      </transition>
      <div style="height: 70px;"></div>
    </div>

    <div slot="footer" class="footer_wrap">
      <button class="btn footer_btn" @click="preview">预览</button>
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
  data: ()=> ({
    pageData: null,
    insurList: [],
    showPage: false,
    pageState: 'loading',
  }),
  components: {
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue')
  },
  methods: {
    getData() {
      let self = this
      let s = dataDeal.submitJson({
        jyh: "GR1060",
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
              self.insurList = [ret[0], ret[1], ret[2], ret[3], ret[4]]
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
      window.location.href = `//shbx.sxxhrss.gov.cn/operation/f/user/getAAC001?claName=${localStorage.getItem('id') || sessionStorage.getItem('iscode')}&mb=cbzm`
    }
  },
  created() {
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
</style>
