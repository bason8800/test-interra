<template>
  <div class="operations-actions">
    <div
      v-for="variant in variantsOperations"
      :key="variant.type"
      class="operations-actions__change-type"
      :class="{ 'is-active': selectedType === variant.type }"
      @click="onChangeType(variant.type)"
    >
      {{ variant.name }}
    </div>

    <BaseButton
      show-plus
      class="operations-actions__add"
      @click="onAddNewOperation"
    >
      Добавить операцию
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';

import { OperationCompletedType } from '@/types/operation';

import BaseButton from '@/components/base/BaseButton.vue';
import { MutationsTypes } from '@/store/operation/mutations';

export default defineComponent({
  name: 'OperationsActions',
  components: {
    BaseButton,
  },
  emits: ['change-type'],
  setup() {
    const router = useRouter();
    const { commit, state } = useStore();

    const variantsOperations = computed(() => [
      {
        name: 'Запланированные операции',
        type: OperationCompletedType.NOT_COMPLETED,
      },
      { name: 'Выполненные операции', type: OperationCompletedType.COMPLETED },
    ]);

    const selectedType = computed(() => state.operation.operationsType);

    const onChangeType = (type: OperationCompletedType) => {
      commit(MutationsTypes.SET_OPERATIONS_TYPE, type);
    };

    const onAddNewOperation = () => {
      router.push('/add-operation');
    };

    return {
      variantsOperations,
      selectedType,

      onChangeType,
      onAddNewOperation,
    };
  },
});
</script>

<style lang="scss" scoped>
.operations-actions {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  &__change-type {
    text-transform: uppercase;
    cursor: pointer;
    transition: color $transition-duration;

    &:first-child {
      margin-right: 18px;
    }

    &.is-active {
      color: $color-blue;
    }
  }

  &__add {
    margin-left: auto;
  }
}
</style>
