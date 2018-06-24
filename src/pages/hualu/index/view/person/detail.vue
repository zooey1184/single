<template lang="html">
<div class="">
  <page :showFooter="true">
    <div v-if="get_personData">
      <div v-if="get_personData[0].ysym">
        <div class="person_item_insurance"  v-for="(item, index) in get_personData" :key="index">
          <form-list name="toastSlideUp">
            <form-item title="应缴年月" :width="110" :showRight="false" :index="4*index+0">
              <p class="right_align">{{item.ysym}}</p>
            </form-item>
            <form-item title="缴纳基数" :width="110" :showRight="false" :index="4*index+1">
              <p class="right_align">{{item.rewage}}</p>
            </form-item>
            <form-item title="单位缴纳部分" :width="110" :showRight="false" :index="4*index+2">
              <p class="right_align">{{item.cparfd}}</p>
            </form-item>
            <form-item title="个人缴纳部分" :width="110" :showRight="false" :index="4*index+3">
              <p class="right_align">{{item.psarfd}}</p>
            </form-item>
            <form-item title="到账标志" :width="110" :showRight="false" :index="4*index+4">
              <p class="right_align">{{item.ftflg}}</p>
            </form-item>
          </form-list>
        </div>
      </div>
      <tip-page v-else>
        <p slot="tip">没有记录</p>
      </tip-page>
    </div>
  </page>
</div>
</template>

<script>
import path from '@/api/path'
import dataDeal from '../../init/config'
import {mapGetters} from 'vuex'
import $ from 'jquery'

export default {
  data: ()=> ({
    pageData: null
  }),
  components: {
    formList: ()=> import ('@/components/FormList/FormList.vue'),
    formItem: ()=> import ('@/components/FormList/FormItem.vue'),
    tipPage: ()=> import ('../../components/PageWrap/TipPage.vue')
  },
  computed: {
    ...mapGetters([
      'get_personData'
    ])
  },
  methods: {
    submitFn() {

    }

  },
  created() {
    // this.pageData.iscode = window.localStorage.getItem('id'),
    // this.pageData.psname = window.sessionStorage.getItem('psname')
    console.log(this.get_personData);
  }
}
</script>

<style lang="less">
.person_item_insurance {
  margin: 20px 0;
}
</style>
