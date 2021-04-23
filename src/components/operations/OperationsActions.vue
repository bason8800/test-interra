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
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { OperationCompletedType } from '@/types/api/Operation';

import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  name: 'OperationsActions',
  components: {
    BaseButton,
  },
  emits: ['change-type'],
  setup(_, context) {
    const router = useRouter();

    const variantsOperations = computed(() => [
      {
        name: 'Запланированные операции',
        type: OperationCompletedType.NOT_COMPLETED,
      },
      { name: 'Выполненные операции', type: OperationCompletedType.COMPLETED },
    ]);

    const selectedType = ref(OperationCompletedType.COMPLETED);

    const onChangeType = (type: OperationCompletedType) => {
      selectedType.value = type;
      context.emit('change-type', type);
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
