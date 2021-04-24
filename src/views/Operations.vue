<template>
  <OperationsHead :info="headInfo" />

  <OperationsActions />

  <ListOperations />

  <router-view v-slot="{ Component }">
    <transition name="fade" appear mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { TDate } from '@/classes/models/TDate';

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
    const headInfo = {
      field: '112',
      date: new TDate({ year: 2018, month: 1, day: 1 }),
      subtitle: 'Боронование зяби и паров',
    };

    return {
      headInfo,
    };
  },
});
</script>

<style lang="scss" scoped></style>
