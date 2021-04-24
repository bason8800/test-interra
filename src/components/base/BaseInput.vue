<template>
  <div class="base-input">
    <label class="base-input__label bold" :for="id" v-if="label">
      {{ label }}
    </label>

    <input
      v-bind="$attrs"
      :value="modelValue"
      :id="id"
      class="base-input__input"
      type="text"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseInput',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    useDatepicker: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const id = `#${Math.random()}`;

    return {
      id,
    };
  },
});
</script>

<style scoped lang="scss">
@mixin input {
  width: 100%;
  padding: 0;
  font-size: $font-size-5;
  color: $color-black;
  border: none;
  outline: none;

  &::placeholder {
    color: $color-grey-5;
  }
}

.base-input {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 48px;
  padding: 0 9px;

  &__label {
    display: block;
    margin-bottom: 3px;
    font-size: 9px;
    text-transform: uppercase;
    opacity: 0.7;
  }

  &__input {
    @include input;
  }
}
</style>
