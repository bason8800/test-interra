<template>
  <div class="base-select">
    <label class="base-select__label bold">{{ label }}</label>

    <select
      v-bind="$attrs"
      class="base-select__select"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="option in innerOptions"
        :key="option.value"
        :value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import { OptionsList } from '@/types';

export default defineComponent({
  name: 'BaseSelect',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    options: {
      type: Array as PropType<OptionsList>,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props) {
    const innerOptions = computed(() => [
      { label: 'Выберете', value: '' },
      ...props.options,
    ]);

    return {
      innerOptions,
    };
  },
});
</script>

<style scoped lang="scss">
.base-select {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 48px;
  padding: 0 5px;

  &::before,
  &::after {
    position: absolute;
    pointer-events: none;
    content: '';
  }

  &::after {
    top: 18px;
    right: 10px;
    z-index: 1;
    width: 14px;
    height: 10px;
    background: url('/dropdown.png') no-repeat center;
  }

  &::before {
    right: 0;
    width: 25px;
    height: 100%;
    pointer-events: none;
    background: $color-white;
  }

  &__label {
    position: absolute;
    top: 8px;
    left: 9px;
    font-size: 9px;
    text-transform: uppercase;
  }

  &__select {
    width: 100%;
    padding-top: 20px;
    margin-bottom: 9px;
    font-size: $font-size-4;
    color: $color-grey-6;
    background: none;
    border: none;
    outline: none;
  }
}
</style>
