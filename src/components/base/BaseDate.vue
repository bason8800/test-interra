<template>
  <div class="base-date bold">
    {{ formatDate }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import format from 'date-fns/format';
import ru from 'date-fns/locale/ru';

import { TDate } from '@/classes/models/TDate';

export default defineComponent({
  name: 'BaseDate',
  props: {
    date: {
      type: Object as PropType<TDate>,
      default: () => ({}),
    },
  },
  setup(props) {
    const date = new Date(
      props.date.year,
      props.date.month - 1,
      props.date.day,
    );

    const formatDate = format(date, 'd MMM yy', {
      locale: ru,
    });

    return {
      formatDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-date {
  text-transform: uppercase;
  opacity: 0.8;
}
</style>
