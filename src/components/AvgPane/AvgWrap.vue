<template>
  <div class="step_bar_wrap" ref="steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'avg-wrap'
}
</script>

<style scoped>
.step_bar_wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  width: 100%;
}
</style>
