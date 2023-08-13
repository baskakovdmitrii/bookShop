<template>
  <select
        :value="modelValue"
        @change="changeOption"
  >
    <option
        disabled
        value=""
    >
        Сортировать по...
    </option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
        {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'base-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
select {
  border: 2px solid #767676;
  color: #212121;
  padding: 10px 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 46px;
  border-radius: 4px;
}
select:hover{
  background: #e0e0e0;
}


</style>