<template lang="html">
<div>
  <page :showFooter="true">
    <div>
      <form-list name="rightOffset">
        <form-item title="事项类型" :index="0" :width="100" @click.native="pickSexFn" v-reg:regDetail="{rule: /[^\s]/g, msg: '请选择性别', test: pageData.sex, tag: 'sex'}">
          <input type="text" placeholder="请选择性别" v-model="infoType[get_business]">
        </form-item>
        <form-item title="身份证号" :index="2" :width="100" :showRight="false" v-reg:regDetail="{type: 'idCard', test: pageData.iscode, tag: 'iscode'}">
          <input type="text" placeholder="请输入身份证号" v-model="pageData.iscode">
        </form-item>
        <form-item title="姓名" :index="3" :width="100" :showRight="false" v-reg:regDetail="{type: 'realName', test: pageData.psname, tag: 'psname'}">
          <input type="text" placeholder="请输入姓名" v-model="pageData.psname">
        </form-item>
        <form-item title="性别" :index="4"  :width="100" @click.native="pickSexFn" v-reg:regDetail="{rule: /[^\s]/g, msg: '请选择性别', test: pageData.sex, tag: 'sex'}">
          <input type="text" placeholder="请选择性别" v-model="pageData.sex">
        </form-item>
        <form-item title="联系电话" :index="5"  :width="100" :showRight="false" v-reg:regDetail="{type: 'tel', test: pageData.phone, tag: 'tel'}">
          <input type="text" placeholder="请输入联系电话" v-model="pageData.phone">
        </form-item>
        <form-item title="出生日期" :index="6"  :width="100" @click.native="showPick" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入出生年月', test: pageData.born, tag: 'born'}">
          <input type="text" placeholder="请输入出生日期" v-model="pageData.born">
        </form-item>

        <form-item title="养老补缴开始时间" :index="6"  :width="120" @click.native="showPick" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入出生年月', test: pageData.born, tag: 'born'}">
          <input type="text" placeholder="请选择养老补缴开始时间" v-model="pageData.born">
        </form-item>
        <form-item title="养老补缴结束时间" :index="6"  :width="120" @click.native="showPick" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入出生年月', test: pageData.born, tag: 'born'}">
          <input type="text" placeholder="请选择养老补缴结束时间" v-model="pageData.born">
        </form-item>
        <form-item title="医疗补缴开始时间" :index="6"  :width="120" @click.native="showPick" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入出生年月', test: pageData.born, tag: 'born'}">
          <input type="text" placeholder="请输入医疗补缴开始时间" v-model="pageData.born">
        </form-item>
        <form-item title="医疗补缴结束时间" :index="6"  :width="120" @click.native="showPick" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入出生年月', test: pageData.born, tag: 'born'}">
          <input type="text" placeholder="请输入医疗补缴结束时间" v-model="pageData.born">
        </form-item>

        <form-item title="是否参加医保" :index="6"  :width="100" @click.native="showPick" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入出生年月', test: pageData.born, tag: 'born'}">
          <input type="text" placeholder="请选择是否参加医保" v-model="pageData.born">
        </form-item>
        <form-item title="缴费标准" :index="6"  :width="100" @click.native="showPick" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入出生年月', test: pageData.born, tag: 'born'}">
          <input type="text" placeholder="请选择缴费标准" v-model="pageData.born">
        </form-item>
        <form-item title="现居住乡镇" :index="7"  :width="100" @click.native="pickerFn('town')">
          <input type="text" placeholder="请选择现居住乡镇" v-model="townName" v-reg:regDetail="{rule: /[^\s]/g, msg: '请选择现居住乡镇', test: townName, tag: 'townName'}">
        </form-item>
        <form-item title="现居住社区" :index="8"  @click.native="pickerFn('community')" :width="100" v-reg:regDetail="{rule: /[^\s]/g, msg: '请选择现居住社区', test: communityName, tag: 'communityName'}">
          <input type="text" placeholder="请选择现居住社区" v-model="communityName">
        </form-item>
        <form-item title="现居住地址" :index="9"  :width="100" :showRight="false" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入现居住地址', test: pageData.xjzdz, tag: 'xjzdz'}">
          <input type="text" placeholder="请输入现居住地址" v-model="pageData.xjzdz">
        </form-item>
        <form-item title="代办人姓名" :index="9"  :width="100" :showRight="false" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入现居住地址', test: pageData.xjzdz, tag: 'xjzdz'}">
          <input type="text" placeholder="请输入姓名（若代办）" v-model="pageData.xjzdz">
        </form-item>
        <form-item title="代办人身份证" :index="9"  :width="100" :showRight="false" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入现居住地址', test: pageData.xjzdz, tag: 'xjzdz'}">
          <input type="text" placeholder="请输入身份证号（若代办）" v-model="pageData.xjzdz">
        </form-item>
        <form-item title="代办人手机号" :index="9"  :width="100" :showRight="false" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入现居住地址', test: pageData.xjzdz, tag: 'xjzdz'}">
          <input type="text" placeholder="请输入手机号（若代办）" v-model="pageData.xjzdz">
        </form-item>
      </form-list>
      <div style="height: 120px;"></div>
    </div>

    <div slot="footer" class="footer_wrap">
      <button class="btn footer_btn" @click="submitFn" v-reg:regDetail.check="{check: check}">提交</button>
    </div>
  </page>
  <picker :data="data" :selectedIndex="[0]" ref="pick" @select="selectcityFn" cancelTxt="取消" confirmTxt="确定"></picker>
  <picker ref="picker" :data="pickDate" :selectedIndex="[0,0,0]" @change="changeFn" @select="selectFn"  cancelTxt="取消" confirmTxt="确定"></picker>
</div>
</template>

<script>
import {town, community} from '../../mixins/address'
import {mapGetters} from 'vuex'
import path from '@/api/path'
import dataDeal from '../../init/config'
import {check} from '@/plugin/VReg/rule'
import $ from 'jquery'
import date from '../../mixins/date'

export default {
  mixins: [date],
  components: {
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue'),
    picker: ()=> import ('@/components/Picker/Picker.vue')
  },
  data: ()=> ({
    pageData: {
      iscode: "",
      psname: "",
      phone:"",
      sex: "",
      born:"",
      xjzxz:"",
      xjzsq: "",
      xjzdz: ""
    },
    infoData: {
      sxlx: '', // 事项类型 0-6
      iscode: '330682199106040014',
      psname: '',
      sjhm: '',
      lxdz: '',
      acctno: '', // 银行账号
      txlx: '', // 退休类型
      yaosdate: '', // 养老开始
      yaoedate: '', // 养老结束
      sf: '', // 是否参加医保
      yisdate: '', // 医疗开始
      yiedate: '',
      frcode: '', // 缴费标准
      sxcode: '', // 事项编码
      sxname: '' // 事项名称
    },
    infoType: ['灵活就业新增', '灵活就业续保', '灵活就业中断', '灵活就业新增（附带当年补缴）', '灵活就业续保（附带当年补缴）', '医疗险种（增加）', '医疗险种（减少）'],
    showItem: true, // 是否有数据
    check: false,
    pageState: 'success',
    data: [town],
    townName: '',
    communityName: "",
  }),
  computed: {
    ...mapGetters([
      'get_business'
    ])
  },
  watch: {
    get_business: function(n, o) {
      this.getData()
    },
    townName: function(n, o) {
      this.pageData.xjzsq = ""
      this.communityName = ""
    }
  },
  methods: {
    getinfoFn() { // 数据处理 判断本地是否有数据
      let business_data = localStorage.getItem('business_data')
      if(business_data && JSON.parse(business_data).xjzdz) {
        console.log('hava');
        let res = JSON.parse(business_data)
        this.showItem = false
        this.pageData.iscode = sessionStorage.getItem('iscode') || localStorage.getItem('id')
        this.pageData.psname = res.psname
      }else {
        return false
      }
    },
    initFn(key) {
      
    },
    getData() {
      let business_data = localStorage.getItem('business_data')
      console.log(business_data);
      if(business_data && JSON.parse(business_data).xjzdz) {
        console.log('hava');
        let res = JSON.parse(business_data)
        this.showItem = false
        this.pageData.iscode = sessionStorage.getItem('iscode') || localStorage.getItem('id')
        this.pageData.psname = res.psname
      }else {
        
      }


      console.log('none');
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
          self.pageData.iscode = ret[0].iscode
          if(code===0 || code=='0') {
            // 成功
            self.showItem = false
          }else if(code=="-1") {
            self.showItem = true
            return
          }else {
            self.pageState = 'error'
            return
          }
        }
      })
    },
    pickSexFn() {
      let self = this
      this.$picker.show({
        dataPick: [
          {
            text: "男",
            value: "1"
          },
          {
            text: "女",
            value: "0"
          }
        ],
        confirmFn: function(i, k, t) {
          self.pageData.sex = t[0]
        }
      })
    },
    selectFn(i, e, v) {
      console.log(v);
      this.pageData.born = `${v[0]}${v[1]}${v[2]}`
    },
    showPick() {
      let pick = this.$refs.picker
      pick.show()
    },
    selectcityFn(i,v,t) {
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
      // this.check = true
      // check('regDetail')
      if(1) {
        let d = new Date()

        let self = this
        let s = dataDeal.submitJson({
          jyh: "GR1092",
          ...this.infoData
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
            console.log(ret);
            if(r===0 ||r=='0') {
              self.$toast.show('出错啦，请稍后再试')
            }else if(r===1 || r=='1') {
              self.$toast.show({
                position: 'middle',
                type: 'success',
                message: "受理成功"
              })
              setTimeout(()=> {
                self.$router.back()
              }, 1000)
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
    this.init()
    this.getData()
  }
}
</script>

<style lang="less">
@import url('../../init/footer_btn.less');
</style>
