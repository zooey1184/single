<template>
  <div class="progress_list_wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "form-list",
}
</script>

<style scoped>
.progress_list_wrap {
  position: relative;
}
</style>
