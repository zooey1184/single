<!-- 社保证明验证 -->
<template lang="html">
<div class="">
  <page>
    <div>
      <form-list name="rightOffset">
        <form-item title="证明类别" :index="0" :width="100">
          <input type="text" placeholder="请选择证明类别" v-model="pageData.id">
        </form-item>
        <form-item title="证明编号" :index="1" :width="100">
          <input type="text" placeholder="请选择证明编号" name="" value="">
        </form-item>
      </form-list>
      <button class="btn_prove">验证</button>
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

<style lang="less">
.btn_prove {
  display: block;
  margin: 20px auto;
  outline: none;
  border: none;
  height: 42px;
  font-size: 16px;
  color: #fff;
  background: rgb(10, 167, 245);
  width: 90%;
  &:active {
    opacity: 0.8
  }
}
</style>
