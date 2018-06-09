<template lang="html">
<div class="">
  <page>
    <div>
      <form-list name="rightOffset">
        <form-item title="身份证号" :index="0" :width="100">
          <input type="text" placeholder="请输入身份证号" v-model="pageData.id">
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
export default {
  components: {
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue')
  },
  data: ()=> ({
    pageData: {
      id: "",
      name: '',
      phone: '',

    }
  })
}
</script>

<style lang="css">
</style>
