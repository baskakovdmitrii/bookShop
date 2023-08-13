<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
}
</script>

<style lang="scss" scoped>
.btn {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 14px;
  color: black;
  border-radius: 4px;
}
.btn:hover {
  color: black;
  background: #e0e0e0;
}
</style>