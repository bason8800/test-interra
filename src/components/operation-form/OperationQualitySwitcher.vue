<template>
  <div class="quality-switcher">
    <div class="quality-switcher__title bold">Качество выполнения операции</div>

    <div class="quality-switcher__block">
      <button
        v-for="item in qualityList"
        :key="item.assessment"
        class="quality-switcher__btn bold"
        :class="{ 'is-active': modelValue === item.assessment }"
        type="button"
        @click="onChangeQuality(item.assessment)"
      >
        {{ getName(item.name) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { QualityList } from '@/types/operation';
import { Assessment } from '@/types/api/Operation';

const MAX_NAME_LENGTH = 7;

export default defineComponent({
  name: 'OperationQualitySwitcher',
  emits: ['update:modelValue'],
  props: {
    qualityList: {
      type: Array as PropType<QualityList>,
      default: () => [],
    },
    modelValue: {
      type: Number as PropType<Assessment>,
      default: null,
    },
  },
  setup(props, context) {
    const onChangeQuality = (assessment: Assessment) => {
      context.emit('update:modelValue', assessment);
    };

    const getName = (name: string): string => {
      if (name.length <= MAX_NAME_LENGTH) {
        return name;
      }

      return `${name.substr(0, 5)}.`;
    };

    return {
      onChangeQuality,
      getName,
    };
  },
});
</script>

<style scoped lang="scss">
.quality-switcher {
  @include padding-form-lr;

  padding-top: 14px;
  border-top: 1px solid $color-grey-2;

  &__title {
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  &__block {
    display: flex;
    height: 41px;
    overflow: hidden;
    background: $color-grey-1;
    border-radius: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__btn {
    flex-shrink: 0;
    width: 33.3%;
    font-size: $font-size-3;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    background: transparent;
    border: none;

    &.is-active {
      color: $color-white;
    }

    &:first-child {
      border-right: 1px solid $color-grey-2;

      &.is-active {
        background: $color-green;
        border-color: $color-green;
      }
    }

    &:nth-child(2) {
      &.is-active {
        background: $color-yellow;
      }
    }

    &:last-child {
      border-left: 1px solid $color-grey-2;

      &.is-active {
        background: $color-red;
        border-color: $color-red;
      }
    }
  }
}
</style>
