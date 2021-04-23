<template>
  <textarea
    class="base-textarea"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseTextarea',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped lang="scss">
.base-textarea {
  //
  width: 100%;
  padding: 0;
  font-size: $font-size-4;
  color: $color-black;
  resize: none;
  border: none;
  outline: none;

  &::placeholder {
    color: $color-grey-5;
  }
}
</style>
