<template>
  <div class="operation-field bold">
    <div class="operation-field__block"></div>

    <div class="operation-field__main">
      <div class="small-text">Поле</div>
      <div>{{ field.fieldId }}</div>
    </div>

    <div class="operation-field__description">
      <div class="operation-field__crop">{{ field.crop }}</div>
      <div class="operation-field__subtitle small-text">
        {{ field.subtitle }}
      </div>
    </div>

    <img :src="field.image" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { Field } from '@/types/operation';

export default defineComponent({
  name: 'OperationFieldDescription',
  props: {
    field: {
      type: Object as PropType<Field>,
      default: () => ({}),
    },
  },
});
</script>

<style scoped lang="scss">
.small-text {
  font-size: $font-size-3;
  opacity: 0.7;
}

.operation-field {
  @include padding-form-lr;

  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: $font-size-4;
  border-top: 1px solid $color-grey-2;
  border-bottom: 1px solid $color-grey-2;

  &__block {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    background: $color-green-2;
    border: 1px solid $color-green;
  }

  &__description {
    margin-right: 10px;
    margin-left: auto;
  }

  &__subtitle {
    margin-top: 3px;
    text-align: right;
  }
}
</style>
