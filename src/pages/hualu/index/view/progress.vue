<template>
<div>
  <page>
    <div class="">
      <v-progress :active="3">
        <item title="hello" desc='howrd' :index="1"></item>
        <item title="hello" desc='howrd' :index="2"></item>
        <item title="hello" desc='howrd' :index="3"></item>
        <item title="hello" desc='howrd' :index="4" :showLine="false"></item>
      </v-progress>
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

<style lang="css">
</style>
