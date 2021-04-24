<template>
  <tr class="list-operation-item" @click="onChangeRoute">
    <td class="bold">
      <BaseDate :date="operation.date" />
    </td>

    <td class="bold">{{ operationName }}</td>

    <td>
      <div class="list-operation-item__crop">
        <img :src="operation.image" alt="" />
        {{ operation.crop }}
      </div>
    </td>

    <td>
      <OperationQuality :assessment="operation.assessment" />
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useRouter } from 'vue-router';

import { OperationType } from '@/types/api/Operation';
import { Operation } from '@/classes/models/Operation';
import { locale } from '@/locales/ru.ts';

import BaseDate from '@/components/base/BaseDate.vue';
import OperationQuality from '@/components/operations/OperationQuality.vue';

export default defineComponent({
  name: 'ListOperationsItem',
  components: {
    BaseDate,
    OperationQuality,
  },
  props: {
    operation: {
      type: Object as PropType<Operation>,
      default: () => ({}),
    },
  },
  setup(props) {
    const router = useRouter();

    const onChangeRoute = () => {
      router.push(`/edit-operation/${props.operation.id}`);
    };

    const operationName = computed(
      () => locale[OperationType[props.operation.type]],
    );

    return {
      operationName,

      onChangeRoute,
    };
  },
});
</script>

<style scoped lang="scss">
.list-operation-item {
  cursor: pointer;

  td {
    height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid $color-grey-2;
  }

  &__name {
    font-weight: $font-bold;
  }

  &__crop {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
    }
  }
}
</style>
