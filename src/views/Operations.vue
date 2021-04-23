<template>
  <OperationsHead :info="headInfo" />
  <OperationsActions @change-type="onChangeType" />
  <ListOperations :list-type="listType" />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { TDate } from '@/classes/models/TDate';

import { OperationCompletedType } from '@/types/api/Operation';

import OperationsHead from '@/components/operations/OperationsHead.vue';
import OperationsActions from '@/components/operations/OperationsActions.vue';
import ListOperations from '@/components/operations/ListOperations.vue';

export default defineComponent({
  name: 'Operations',
  components: {
    OperationsHead,
    OperationsActions,
    ListOperations,
  },
  setup() {
    const listType = ref(OperationCompletedType.COMPLETED);

    const headInfo = {
      field: '112',
      date: new TDate({ year: 2018, month: 1, day: 1 }),
      subtitle: 'Боронование зяби и паров',
    };

    const onChangeType = (type: OperationCompletedType) => {
      listType.value = type;
    };

    return {
      headInfo,
      listType,

      onChangeType,
    };
  },
});
</script>

<style lang="scss" scoped></style>
