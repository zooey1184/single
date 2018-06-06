<template>
  <div class="step_list_wap">
    <div class="step_list_contain">
      <step-bar :active="active"  align='center'>
        <step title="信用资料" :index='1'></step>
        <step title="基本信息" :index='2'></step>
        <step title="芝麻信用" :index='3'></step>
        <step title="确认申请" :index='4'></step>
      </step-bar>
    </div>
  </div>
</template>

<script>
import Step from './Step.vue'
import StepBar from './StepBar.vue'

export default {
  name: 'step-list',
  components: {
    Step,
    StepBar
  },
  props: {
    active: {
      type: [String, Number],
      default: 1
    }
  }
}
</script>

<style lang="less" scoped>
.step_list_wap {
  position: relative;
  width: 100%;
  height: 70px;
  background: #fff;
}
.step_list_contain {
  position: absolute;
  width: 100%;
  height: 47px;
  top: 14px;
  padding: 0 12px;
  box-sizing: border-box;
}
</style>
