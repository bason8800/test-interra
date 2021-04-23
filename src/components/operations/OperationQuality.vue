<template>
  <div class="operation-quality" :class="quality.class">
    <div class="operation-quality__icon"></div>
    {{ quality.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Assessment } from '@/types/api/Operation';

import { locale } from '@/locales/ru';

export default defineComponent({
  name: 'OperationQuality',
  props: {
    assessment: {
      type: Number as PropType<Assessment>,
      default: null,
    },
  },
  setup(props) {
    const classes = {
      [Assessment.BADLY]: 'is-red',
      [Assessment.EXCELLENT]: 'is-green',
      [Assessment.SATISFACTORILY]: 'is-yellow',
    };

    const noQuality = {
      class: 'is-grey',
      name: 'Нет оценки',
    };

    const quality = computed(() =>
      props.assessment === null
        ? noQuality
        : {
            class: classes[props.assessment],
            name: locale[Assessment[props.assessment]],
          },
    );

    return {
      quality,
    };
  },
});
</script>

<style scoped lang="scss">
.operation-quality {
  $p: &;

  display: flex;
  align-items: center;

  &.is-grey {
    color: $color-grey-3;
  }

  &__icon {
    width: 20px;
    height: 10px;
    margin-right: 10px;
    background: $color-grey-2;
    border-radius: 10px;

    #{$p}.is-red & {
      background: $color-red;
    }

    #{$p}.is-green & {
      background: $color-green;
    }

    #{$p}.is-yellow & {
      background: $color-yellow;
    }
  }
}
</style>
