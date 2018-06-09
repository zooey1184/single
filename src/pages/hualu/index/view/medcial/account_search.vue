<template lang="html">
<div>
  <page title="医保账户信息查询">
    <div>
      <div>
        <p class="pane_title">个人信息</p>
        <form-list name="rightOffset">
          <form-item title="身份证号" :width="120" :showRight="false">
            <p class="account_pane">350921 **** **** 0012</p>
          </form-item>
          <form-item title="姓名" :width="120" :showRight="false">
            <p class="account_pane">*应</p>
          </form-item>
        </form-list>
      </div>
      <div>
        <p class="pane_title">账户信息</p>
        <form-list name="rightOffset">
          <form-item title="个人编号" :width="120" :showRight="false">
            <p class="account_pane">350921 **** **** 0012</p>
          </form-item>
          <form-item title="当年个账余额" :width="120" :showRight="false">
            <p class="account_pane">*应</p>
          </form-item>
          <form-item title="历年个账余额" :width="120" :showRight="false">
            <p class="account_pane">350921 **** **** 0012</p>
          </form-item>
          <form-item title="截止到目前医保累计余额" :width="180" :showRight="false">
            <p class="account_pane">*应</p>
          </form-item>
        </form-list>
      </div>
    </div>
  </page>
</div>
</template>

<script>
export default {
  components: {
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue')
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
</style>
