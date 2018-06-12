<template lang="html">
<div class="">
  <page>
    <div>
      <form-list name="rightOffset">
        <form-item title="身份证号" :index="0" :width="100">
          <input type="text" placeholder="请输入身份证号">
        </form-item>
        <form-item title="姓名" :index="1" :width="100">
          <input type="text" placeholder="请输入姓名" name="" value="">
        </form-item>
        <form-item title="手机号" :index="2" :width="100">
          <input type="text" placeholder="请输入身份证号" name="" value="">
        </form-item>
        <form-item title="固定电话" :index="3" :width="100">
          <input type="text" placeholder="请输入手机号" name="" value="">
        </form-item>
        <form-item title="现居住地" :index="4" :width="100">
          <input type="text" placeholder="请输入身份证号" name="" value="">
        </form-item>
        <form-item title="现居地址" :index="5" :width="100">
          <input type="text" placeholder="请输入身份证号" name="" value="">
        </form-item>
        <form-item title="户籍" :index="6" :width="100">
          <input type="text" placeholder="请输入身份证号" name="" value="">
        </form-item>
      </form-list>
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
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue')
  },
  data: ()=> ({
    pageData: null,
    pageState: 'success',
    tip: "",
    state: ""
  }),
  computed: {
    ...mapGetters([
      'get_business'
    ])
  },
  watch: {
    get_business: function(n, o) {
      console.log(n);
    }
  },
  methods: {
    getData() {
      let self = this
      let s = dataDeal.submitJson({
        jyh: "GR1040",
        // iscode: "350921199101200012",
        iscode: window.localStorage.getItem('id'),
        psname: window.sessionStorage.getItem('psname'),
        gnmc: this.get_business,
        // ptywlsh:
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
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="css">
</style>
