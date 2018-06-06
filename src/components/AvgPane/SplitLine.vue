<template>
  <div class="split_pane_wrap">
    <div class="line_split_contain" :style="{borderTopColor: `${border}`, width: `${width}px`}"></div>
    <div class="splitPane_title">
      <slot>
        <p>title</p>
      </slot>
    </div>
    <div class="line_split_contain" :style="{borderTopColor: `${border}`, width: `${width}px`}"></div>
  </div>
</template>

<script>
export default {
  // name: "split-line",
  props: {
    border: {
      type: String,
      default: "rgba(208,208,207,1)"
    },
    width: {
      type: Number,
      default: 30
    }
  }
}
</script>

<style scoped>
.split_pane_wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.splitPane_title {
  margin: 0 15px;
  color:rgba(153,153,153,1);
  line-height:36px;
  font-size:12px;
}
.line_split {
  width: 30px;
  border-top: 1px solid rgba(208,208,207,1);
  border-left: none;
  border-right: none;
  border-bottom: none;
}
</style>
