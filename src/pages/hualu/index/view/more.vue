<template lang="html">
  <page :showHeader="false">
    <div class="">
      <res-page>
        <p slot='tip'>没有更多</p>
      </res-page>
    </div>
  </page>
</template>

<script>
export default {
  name: 'more-page',
  components: {
    resPage: ()=> import ('../components/PageWrap/TipPage.vue')
  }
}
</script>

<style lang="css">
</style>
