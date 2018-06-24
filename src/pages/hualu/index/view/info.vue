<template>
<div>
  <page title="完善个人信息" :showFooter="true">
    <div class="">
      <form-list name="rightOffset">
        <form-item title="身份证号" :index="0" :width="100" :showRight="false" v-reg:info="{type: 'idCard', test: pageData.iscode, tag: 'iscode'}">
          <input type="text" placeholder="请输入身份证号" v-model="pageData.iscode">
        </form-item>
        <form-item title="姓名" :index="1" :width="100" :showRight="false" v-reg:info="{type: 'realName', test: pageData.psname, tag: 'psname'}">
          <input type="text" placeholder="请输入姓名" v-model="pageData.psname">
        </form-item>
        <form-item title="手机号" :index="2" :width="100" :showRight="false" v-reg:info="{type: 'tel', test: pageData.sjhm, tag: 'tel'}">
          <input type="text" placeholder="请输入手机号" v-model="pageData.sjhm">
        </form-item>
        <!-- <form-item title="固定电话" :index="3" :width="100">
          <input type="text" placeholder="请输入固定电话" name="" value="">
        </form-item> -->
        <form-item title="现居住乡镇" :index="3" :width="100" @click.native="pickerFn('town')" v-reg:info="{rule: /[^\s]/g, msg: '请选择现居住乡镇', test: townName, tag: 'townName'}">
          <input type="text" placeholder="请选择" v-model="townName">
        </form-item>
        <form-item title="现居住社区" :index="4" :width="100" @click.native="pickerFn('community')" v-reg:info="{rule: /[^\s]/g, msg: '请选择现居住社区', test: communityName, tag: 'communityName'}">
          <input type="text" placeholder="请选择" v-model="communityName">
        </form-item>
        <form-item title="户籍地址" :index="5" :width="100" :showRight="false" v-reg:info="{rule: /[^\s]/g, msg: '请输入户籍地址', test: pageData.hjdz, tag: 'hjdz'}">
          <input type="text" placeholder="请输入户籍地址" v-model="pageData.hjdz">
        </form-item>
        <form-item title="现居住地址" :index="6" :width="100" :showRight="false" v-reg:info="{rule: /[^\s]/g, msg: '请输入现居住地址', test: pageData.xjzdz, tag: 'xjzdz'}">
          <input type="text" placeholder="请输入现居住地址" v-model="pageData.xjzdz">
        </form-item>
      </form-list>
    </div>
    <div slot="footer" class="page_footer">
      <button type="button" name="button" @click="submitFn" v-reg:info.check="{check: check}">提交</button>
    </div>
  </page>
  <picker :data="data" :selectedIndex="[0]" ref="pick" @select="selectFn"></picker>
</div>
</template>

<script>
import {town, community} from '../mixins/address'
import {check} from '@/plugin/VReg/rule'
import path from '@/api/path'
import dataDeal from '../init/config'
import $ from 'jquery'

export default {
  components: {
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue'),
    picker: ()=> import ('@/components/Picker/Picker.vue')
  },
  data: ()=> ({
    pageData: {
      iscode: "",
      psname: "",
      sjhm: '',
      xjzxz: '',
      xjzsq: '',
      hjdz: '',
      xjzdz: ''
    },
    pickType: 'town',
    data: [town],
    townName: '',
    communityName: "",
    check: false
  }),
  watch: {
    townName: function(n, o) {
      this.pageData.xjzsq = ""
      this.communityName = ""
    }
  },
  methods:{
    getData() {
      let self = this
      let s = dataDeal.submitJson({
        jyh: "GR1091",
        iscode: sessionStorage.getItem('iscode') || localStorage.getItem('id'),
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
          if(code===0 || code=='0') {
            // 成功
            self.pageData = {
              iscode: ret[0].iscode,
              psname: ret[0].psname,
              sjhm: ret[0].mtel,
              xjzxz: ret[0].groupidname,
              xjzsq: ret[0].groupidname2,
              hjdz: ret[0].regaddr,
              xjzdz: ret[0].address
            }
          }else if(code=="-1") {
            self.pageData.iscode = sessionStorage.getItem('iscode') || localStorage.getItem('id') || ""
            return
          }else {
            self.pageState = 'error'
            return
          }
        }
      })
    },
    selectFn(i,v,t) {
      if(this.pickType=='town') {
        this.townName = t[0]
        this.pageData.xjzxz = town[v].value
      }else {
        let c = this.pageData.xjzxz || '330621001'
        this.communityName = t[0]
        this.pageData.xjzsq = community[c][v].value
      }
    },
    pickerFn(val) {
      let p = this.$refs.pick
      this.pickType = val
      if(val=='community') {
        let c = this.pageData.xjzxz || '330621001'
        this.data = [community[c]]
      }else {
        this.data = [town]
      }
      setTimeout(()=> {
        p.show()
      }, 50)
    },
    submitFn() {
      this.check = true
      if(check('info')) {
        console.log('ok');
        let d = this.pageData
        if(d.xjzsq===0 || d.xjzsq=='0') {
          d.xjzsq = ''
        }
        let self = this
        d.jyh = 'GR1090'
        let s = dataDeal.submitJson(d)
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
            if(code===0 || code=='0') {
              // 成功
              self.$toast.show({
                position: 'middle',
                type: 'success',
                message: "保存成功"
              })
              setTimeout(()=> {
                self.$router.back()
              }, 1200)
            }else if(code=="-1") {
              self.$toast.show(ret[0].retmsg)
            }else {
              self.$toast.show('出错了')
              return
            }
          }
        })
      }else {
        setTimeout(()=> {
          this.check = false
        }, 50)
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less">
.page_footer {
  background: #fff;
  height: 100%;
  width: 100%;
  button {
    position: absolute;
    width: 90%;
    left: 5%;
    height: 48px;
    font-size: 16px;
    border: none;
    top: 6px;
    color: #fff;
    background: #1f7eee;
    color: #fff;
    outline: none;
    &:active {
      opacity: 0.8
    }
  }
}
</style>
