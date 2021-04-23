<template>
  <div class="operations-head">
    <h1 class="operations-head__title">Операции на поле {{ info.field }}</h1>

    <div class="operations-head__sup">
      <BaseDate class="operations-head__date" :date="info.date" />

      <div class="operations-head__subtitle">{{ info.subtitle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import BaseDate from '@/components/base/BaseDate.vue';
import { TDate } from '@/classes/models/TDate';

type Info = {
  field: string;
  subtitle: string;
  date: TDate;
};

export default defineComponent({
  name: 'OperationsHead',
  props: {
    info: {
      type: Object as PropType<Info>,
      default: () => ({}),
    },
  },
  components: {
    BaseDate,
  },
});
</script>

<style lang="scss" scoped>
.operations-head {
  display: flex;
  margin-bottom: 15px;

  &__title {
    margin: 0;
    font-size: $font-size-7;
    font-weight: $font-bold;
  }

  &__subtitle {
    margin-left: 20px;
  }

  &__sup {
    display: flex;
  }
}
</style>
