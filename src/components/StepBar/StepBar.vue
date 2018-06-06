<template>
  <div class="step_bar_wrap" ref="steps" :active="activeC">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'steps',
  data: ()=> ({
    node: "1",
    width: "100px"
  }),
  computed: {
    activeC: function() {
      return this.active
    }
  },
  props: {
    active: [String, Number]
  },
}
</script>

<style scoped>
.step_bar_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
</style>
