<template>
<div>
  <page>
    <div>
      <div class="progress_wrap">
        <v-progress :active="3">
          <item title="hello" desc='howrd' :index="1"></item>
          <item title="hello" desc='howrd' :index="2"></item>
          <item title="hello" desc='howrd' :index="3"></item>
          <item title="hello" desc='howrd' :index="4" :showLine="false"></item>
        </v-progress>
      </div>
    </div>
  </page>
</div>
</template>

<script>
export default {
  components: {
    vProgress: ()=> import ('@/components/progress/progress.vue'),
    item: ()=> import ('@/components/progress/item.vue')
  }
}
</script>

<style lang="less">
.progress_wrap {
  position: relative;
  width: 94%;
  left: 3%;
  border-radius: 5px;
  overflow: hidden;
  margin: 30px 0;
  box-shadow: 0 0 15px #ddd;
}
</style>
