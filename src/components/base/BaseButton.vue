<template>
  <button
    class="base-button"
    v-bind="$attrs"
    :class="{ [`theme-${theme}`]: theme }"
  >
    <span v-if="showPlus" class="base-button__plus"></span>

    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const listThemes = ['green'];

export default defineComponent({
  name: 'BaseButton',
  props: {
    showPlus: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: '',
      validation: (val: string) => {
        if (!val) {
          return false;
        }

        return listThemes.includes(val);
      },
    },
  },
});
</script>

<style scoped lang="scss">
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 15px;
  font-family: $font-family-ubuntu;
  font-size: $font-size-3;
  cursor: pointer;
  background: $color-white;
  border: none;
  border-radius: 30px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.theme-green {
    font-weight: $font-bold;
    color: $color-white;
    text-transform: uppercase;
    background: $color-green;
    border-radius: 0;
  }

  &__plus {
    position: relative;
    width: 16px;
    height: 16px;
    margin-right: 7px;
    background: $color-green;
    border-radius: 16px;

    &::after,
    &::before {
      position: absolute;
      content: '';
      background: $color-white;
    }

    &::before {
      top: 50%;
      left: 50%;
      width: 8px;
      height: 2px;
      margin-top: -1px;
      margin-left: -4px;
    }

    &::after {
      top: 50%;
      left: 50%;
      width: 2px;
      height: 8px;
      margin-top: -4px;
      margin-left: -1px;
    }
  }
}
</style>
