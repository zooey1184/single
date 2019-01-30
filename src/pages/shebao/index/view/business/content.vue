<template>
<div>
  <page :showFooter="true">
    <div>
      <form-list name="rightOffset">
        <form-item title="事项类型" v-if='showType1' :index="0" :width="100" @click.native='pickTypeFn'  v-reg:regDetail="{rule: /[^\s]/g, msg: '请选择事项类型', test: info_type, tag: 'info_type'}">
          <input type="text" placeholder="请选择事项类型" readonly v-model="info_type">
        </form-item>
        <form-item title="事项类型" v-else :index="0" :showRight='false' :width="100">
          <p>{{sxcodeArr[get_business].sxname}}</p>
        </form-item>
        <form-item title="身份证号" :index="1" :width="100" :showRight="false" v-reg:regDetail="{type: 'id', test: infoData.iscode, tag: 'iscode'}">
          <input type="text" placeholder="请输入身份证号" v-model="infoData.iscode">
        </form-item>
        <form-item title="姓名" :index="2" :width="100" :showRight="false" v-reg:regDetail="{type: 'realName', test: infoData.psname, tag: 'psname'}">
          <input type="text" placeholder="请输入姓名" v-model="infoData.psname">
        </form-item>
        <form-item title="性别" :index="3"  :width="100" @click.native="pickSexFn" v-reg:regDetail="{rule: /[^\s]/g, msg: '请选择性别', test: pageData.sex, tag: 'sex'}">
          <input type="text" placeholder="请选择性别" v-model="pageData.sex">
        </form-item>
        <form-item title="联系电话" :index="4"  :width="100" :showRight="false" v-reg:regDetail="{type: 'tel', test: infoData.sjhm, tag: 'tel'}">
          <input type="tel" placeholder="请输入联系电话" v-model="infoData.sjhm">
        </form-item>
        <form-item title="出生日期" :index="5"  :width="100" @click.native="showPick('born')" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入出生年月', test: pageData.born, tag: 'born'}">
          <input type="text" placeholder="请输入出生日期" v-model="pageData.born">
        </form-item>

        <form-item title="退休类型" v-if='showType2' :index="6" :width="100" @click.native='pickTuixiuFn'  v-reg:regDetail="{rule: /[^\s]/g, msg: '请选择事项类型', test: tuixiu_type, tag: 'tuixiu_type'}">
          <input type="text" placeholder="请选择事项类型" readonly v-model="tuixiu_type">
        </form-item>
        <form-item title="养老补缴开始时间" v-if='showYiedate' :index="6"  :width="120" @click.native="showPick('yaosdate')">
          <input type="text" placeholder="请选择养老补缴开始时间" v-model="infoData.yaosdate">
        </form-item>
        <form-item title="养老补缴结束时间" v-if='showYiedate' :index="6"  :width="120" @click.native="showPick('yaoedate')">
          <input type="text" placeholder="请选择养老补缴结束时间" v-model="infoData.yaoedate">
        </form-item>
        <form-item title="医疗补缴开始时间" v-if='showYiedate' :index="6"  :width="120" @click.native="showPick('yisdate')">
          <input type="text" placeholder="请输入医疗补缴开始时间" v-model="infoData.yisdate">
        </form-item>
        <form-item title="医疗补缴结束时间" v-if='showYiedate' :index="6"  :width="120" @click.native="showPick('yiedate')">
          <input type="text" placeholder="请输入医疗补缴结束时间" v-model="infoData.yiedate">
        </form-item>

        <form-item title="是否参加医保" :index="7" @click.native='pickYiFn' :width="100">
          <input type="text" placeholder="请选择是否参加医保" v-model="sf">
        </form-item>
        <form-item title="缴费标准" :index="8" @click.native='pickStandardFn' :width="100">
          <input type="text" placeholder="请选择缴费标准" v-model="frcode">
        </form-item>
        <form-item title="现居住乡镇" :index="9"  :width="100" @click.native="pickerFn('town')">
          <input type="text" placeholder="请选择现居住乡镇" v-model="townName" v-reg:regDetail="{rule: /[^\s]/g, msg: '请选择现居住乡镇', test: townName, tag: 'townName'}">
        </form-item>
        <form-item title="现居住社区" :index="10"  @click.native="pickerFn('community')" :width="100" v-reg:regDetail="{rule: /[^\s]/g, msg: '请选择现居住社区', test: communityName, tag: 'communityName'}">
          <input type="text" placeholder="请选择现居住社区" v-model="communityName">
        </form-item>
        <form-item title="现居住地址" :index="11"  :width="100" :showRight="false" v-reg:regDetail="{rule: /[^\s]/g, msg: '请输入现居住地址', test: pageData.xjzdz, tag: 'xjzdz'}">
          <input type="text" placeholder="请输入现居住地址" v-model="pageData.xjzdz">
        </form-item>
        <form-item title="代办人姓名" :index="12"  :width="100" :showRight="false" v-if='showType1'>
          <input type="text" placeholder="请输入姓名（若代办）" v-model="pageData.dbrname">
        </form-item>
        <form-item title="代办人身份证" :index="13"  :width="100" v-if='showType1' :showRight="false">
          <input type="text" placeholder="请输入身份证号（若代办）" v-model="pageData.dbrid">
        </form-item>
        <form-item title="代办人手机号" :index="14"  :width="100" v-if='showType1' :showRight="false">
          <input type="text" placeholder="请输入手机号（若代办）" v-model="pageData.dbrtel">
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
      xjzdz: "",
      dbrname: '',
      dbrid: '',
      dbrtel: ''
    },
    infoData: {
      sxlx: '', // 事项类型 0-6
      iscode: '',
      psname: '',
      sjhm: '',
      lxdz: '',
      acctno: '', // 银行账号
      txlx: '', // 退休类型
      yaosdate: '', // 养老开始
      yaoedate: '', // 养老结束
      sf: '1', // 是否参加医保 0否
      yisdate: '', // 医疗开始
      yiedate: '',
      frcode: '11', // 缴费标准
      sxcode: '3306211129', // 事项编码
      sxname: '个体劳动者（灵活就业人员）参保登记', // 事项名称
    },
    info_type: '',
    dateType: 'yaosdate',
    frcode: '自由职业80档',
    sf: '是',
    infoType: ['灵活就业新增', '灵活就业续保', '灵活就业中断', '灵活就业新增（附带当年补缴）', '灵活就业续保（附带当年补缴）', '医疗险种（增加）', '医疗险种（减少）'],
    showItem: true, // 是否有数据
    check: false,
    pageState: 'success',
    data: [town],
    townName: '',
    communityName: "",
    tuixiuType: ['正常退休', '提前退休'],
    tuixiu_type: '',
    sxcodeArr: [
      {
        sxcode: '3306211129',
        sxname: '个体劳动者（灵活就业人员）参保登记'
      },
      {
        sxcode: '3306211136',
        sxname: '城乡居民基本养老保险参保登记'
      },
      {
        sxcode: '3306213329',
        sxname: '新增退休人员养老保险待遇核准支付'
      }
    ]
  }),
  computed: {
    ...mapGetters([
      'get_business'
    ]),
    showYiedate: function() {
      return (this.infoData.sxlx == '3' || this.infoData.sxlx == '4') ? true : false
    },
    showType1: function() {
      return this.get_business !== 0 ? false : true
    },
    showType2: function() {
      return this.get_business !== 2 ? false : true
    }
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
        console.log('本地数据存储记录读取');
        let res = JSON.parse(business_data)
        this.showItem = false
        this.pageData.iscode = sessionStorage.getItem('iscode') || localStorage.getItem('id')
        this.pageData.psname = res.psname
        this.infoData.iscode = sessionStorage.getItem('iscode') || localStorage.getItem('id')
        this.infoData.psname = res.psname
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
      }
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
          // self.infoData.sex = t[0]
        }
      })
    },
    pickTypeFn() {
      const self = this
      const d = this.infoType
      let data = []
      data = d.map((item, index)=> {
        return {
          text: item,
          value: index
        }
      })
      this.$picker.show({
        dataPick: data,
        confirmFn: (i, k, t)=> {
          self.infoData.sxlx = k[0]
          self.info_type = t[0]
          console.log(`sxlx: ${k[0]}, text: ${t[0]}`);
        }
      })
    },
    pickTuixiuFn() {
      const self = this
      const d = this.tuixiuType
      let data = []
      data = d.map((item, index)=> {
        return {
          text: item,
          value: index
        }
      })
      this.$picker.show({
        dataPick: data,
        confirmFn: (i, k, t)=> {
          self.infoData.txlx = k[0]
          self.tuixiu_type = t[0]
          console.log(`sxlx: ${k[0]}, text: ${t[0]}`);
        }
      })
    },
    pickStandardFn() {
      const self = this
      let d = [
        {
          text: "自由职业80档",
          value: "11"
        },
        {
          text: "自由职业100档",
          value: "13"
        },
        {
          text: "自由职业200档",
          value: "14"
        },
        {
          text: "自由职业300档",
          value: "15"
        }
      ]
      this.$picker.show({
        dataPick: d,
        confirmFn: (i, k, t)=> {
          self.infoData.frcode = t[0]
          let key = k[0]
          self.frcode = d[key].text
        }
      })
    },
    pickYiFn() {
      const self = this
      let d = [
        {
          text: "是",
          value: "1"
        },
        {
          text: "否",
          value: "0"
        }
      ]
      this.$picker.show({
        dataPick: d,
        confirmFn: (i, k, t)=> {
          self.infoData.sf = t[0]
          let key = k[0]
          self.sf = d[key].text
        }
      })
    },
    selectFn(i, e, v) {
      console.log(v);
      if(this.dateType == 'born') {
        this.pageData.born = `${v[0]}${v[1]}${v[2]}`
      }else {
        let t = this.dateType
        this.infoData[t] = `${v[0]}${v[1]}${v[2]}`
      }
    },
    showPick(dateType) {
      let pick = this.$refs.picker
      this.dateType = dateType
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
      this.check = true
      // check('regDetail')
      if(check('regDetail')) {
        let d = new Date()
        // this.infoData.sxlx = this.get_business
        this.infoData.lxdz = this.townName + '-' + this.communityName + '-' + this.pageData.xjzdz
        this.infoData.groupidcx = this.townName
        this.infoData.groupidcx2 = this.communityName
        this.infoData.regaddr = this.infoData.lxdz
        let self = this
        let s = dataDeal.submitJson({
          jyh: "GR1092",
          ...this.infoData
        })
        console.log(s);
        let data = {
          inmsg: s
        }
        console.log(s);
        $.ajax({
          url: path().getInfo,
          data: data,
          type: 'post',
          success: r=> {
            let ret = dataDeal.formJson(r)
            if(ret.length>0) {
              let res = ret[0]
              if(res.retcode===0 || res.retcode=='0') {
                self.$toast.show({
                  position: 'middle',
                  type: 'success',
                  message: "受理成功"
                })
                setTimeout(()=> {
                  self.$router.back()
                }, 1000)
              }else {
                self.$toast.show('出错啦，请稍后再试')
              }
            }else {
              self.$toast.show('出错啦，请稍后再试')
            }
          }
        })
      }else {
        setTimeout(()=> {
          this.check = false
        }, 80)
      }

    }
  },
  created() {
    this.init() // mixins=> date
    this.getinfoFn()
  }
}
</script>

<style lang="less">
@import url('../../init/footer_btn.less');
</style>
