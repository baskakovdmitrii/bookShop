<template>
  <input :value="modelValue" @input="updateInput" type="text">
</template>

<script>
export default {
  name: 'base-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue',event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 300px;
  border-bottom-style: solid;
  padding: 4px 10px;
  outline:none
}
</style>