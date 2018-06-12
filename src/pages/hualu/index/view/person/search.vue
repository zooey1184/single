<template lang="html">
<div class="">
  <page :showFooter="true">
    <div class="" v-if="showPage">
      <form-list name="toastSlideUp">
        <form-item title="姓名" :width="120" :showRight="false">
          <p>{{pageData.psname}}</p>
        </form-item>
        <form-item title="身份证号" :width="120" :showRight="false">
          <p>{{pageData.iscode}}</p>
        </form-item>
        <form-item title="险种" :width="120" @click.native="pickerFn('insuranceList', 'pdcode')">
          <p>{{pageData.pdcode}}</p>
        </form-item>
        <form-item title="年度" :width="120" @click.native="pickerFn('yearList', 'year')">
          <p>{{pageData.year}}</p>
        </form-item>
      </form-list>
    </div>

    <div slot="footer" class="footer_wrap">
      <div class="search_btn_group" v-if="showPage">
        <button class="search_btn text_btn">退出</button>
        <button class="search_btn submit_btn" @click="submitFn">确定</button>
      </div>
    </div>
  </page>
</div>
</template>

<script>
import path from '@/api/path'
import dataDeal from '../../init/config'
import {
  mapActions
} from 'vuex'
import $ from 'jquery'

export default {
  data: () => ({
    pageData: {
      iscode: "",
      psname: "",
      pdcode: "",
      year: ""
    },
    showPage: false,
    insuranceList: [{
        text: "企业养老",
        value: "企业养老"
      },
      {
        text: "医疗保险",
        value: "医疗保险"
      },
      {
        text: "失业保险",
        value: "失业保险"
      },
      {
        text: "工伤保险",
        value: "aa"
      },
      {
        text: "生育保险",
        value: "生育保险"
      }
    ],
    yearList: []
  }),
  components: {
    formList: () =>
      import ('@/components/FormList/FormList.vue'),
    formItem: () =>
      import ('@/components/FormList/FormItem.vue')
  },
  methods: {
    ...mapActions([
      'set_personData'
    ]),
    pickerFn(sel, val) {
      let self = this
      this.$picker.show({
        dataPick: self[sel],
        confirmFn: (i, v, k) => {
          // self.pageData[val] = self[sel][v].value
          self.pageData[val] = k[0]
        }
      })
    },
    getYearFn() {
      let t = new Date()
      let y = t.getFullYear()
      let arr = []
      let rangY = 30
      for (let i = 0; i < rangY; i++) {
        let obj = {
          text: `${y-i}`,
          value: y - i
        }
        arr.push(obj)
      }
      this.yearList = arr
    },
    submitFn() {
      let self = this

      if (this.pageData.pdcode !== "") {
        if (this.pageData.year !== "") {
          let s = dataDeal.submitJson({
            iscode: this.pageData.iscode,
            jyh: 'GR1030',
            pdcode: this.pageData.pdcode,
            nd: this.pageData.year
          })
          let data = {
            inmsg: s
          }
          $.ajax({
            url: path().getInfo,
            data: data,
            type: 'post',
            success: r => {
              let ret = dataDeal.formJson(r)
              let code = ret[0].retcode
              if (code) {
                if (code === "0") {
                  // 成功
                  self.set_personData(ret)
                  self.$router.push('/personal_detail')
                } else if (code === "-1") {
                  self.$toast.show(ret[0].retmsg)
                  self.pageState = 'error'
                  self.tip = ret[0].retmsg || ""
                } else {
                  self.pageState = 'success'
                  return
                }
              } else {
                self.pageState = 'error'
              }
            }
          })
        } else {
          this.$toast.show('请选择年份')
        }
      } else {
        this.$toast.show('请选择险种')
      }
    }
  },
  created() {
    this.pageData.iscode = window.localStorage.getItem('id'),
    this.pageData.psname = window.sessionStorage.getItem('psname')
    this.getYearFn()
    setTimeout(()=> {
      this.showPage = true
    }, 40)
  }
}
</script>

<style lang="less">
.footer_wrap {
    background: #fff;
    height: 100%;
    width: 100%;
    position: relative;
    padding: 0 10px;
}
.search_btn_group {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 7px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
        height: 45px;
        outline: none;
        border: none;
        font-size: 16px;
    }
    .submit_btn {
        width: 80%;
        background: #5281ec;
        color: #fff;
        &:active {
            opacity: 0.8;
        }
    }
    .text_btn {
        background: #fff;
        width: 20%;
        &:active {
            color: #d22e44;
        }
    }
}
</style>
