<template>
  <div class="base-drawer">
    <div class="base-drawer__shadow" @click="$emit('close')"></div>
    <div class="base-drawer__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseDrawer',
  emits: ['close'],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.base-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  &__shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }

  &__content {
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 100vh;
    background: $color-white;
  }
}
</style>
