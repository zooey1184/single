<template lang="html">
<div class="">
  <page :showFooter="true">
    <div class="">
      <form-list>
        <form-item title="姓名" :width="120" :showRight="false">
          <p>{{pageData.psname}}</p>
        </form-item>
        <form-item title="身份证号" :width="120" :showRight="false">
          <p>{{pageData.iscode}}</p>
        </form-item>
        <form-item title="险种" :width="120">
          <p>{{pageData.pdcode}}</p>
        </form-item>
        <form-item title="年度" :width="120">
          <p>{{pageData.year}}</p>
        </form-item>
      </form-list>
    </div>

    <div slot="footer">
      <div class="search_btn_group">
        <button class="search_btn">确定</button>
        <button class="search_btn">退出</button>
      </div>
    </div>
  </page>
</div>
</template>

<script>
export default {
  data: ()=> ({
    pageData: {
      iscode: "",
      psname: "",
      pdcode: "",
      year: ""
    }
  }),
  components: {
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue')
  },
  created() {
    this.pageData.iscode = window.localStorage.getItem('id'),
    this.pageData.psname = window.sessionStorage.getItem('psname')
  }
}
</script>

<style lang="less">
</style>
