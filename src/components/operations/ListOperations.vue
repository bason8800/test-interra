<template>
  <table class="list-operations">
    <thead class="list-operations__head">
      <th
        class="list-operations__head-item"
        v-for="header in headers"
        :key="header.code"
      >
        <span
          class="list-operations__head-name"
          :class="{ 'is-sortable': header.canSort }"
          @click="onChangeSort(header.field, header.canSort)"
        >
          {{ header.name }}
        </span>

        <span
          v-if="header.canSort"
          class="list-operations__sort"
          :class="{
            'is-active': header.field === selectedSort.field,
            'is-desc':
              header.field === selectedSort.field &&
              sortTypes.DESC === selectedSort.sort,
          }"
        />
      </th>
    </thead>

    <tbody>
      <ListOperationsItem
        v-for="operation in listOperations"
        :key="operation.id"
        :operation="operation"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, PropType } from 'vue';

import { useStore } from '@/store';
import { ActionTypes } from '@/store/operation/actions';

import { SortTypes } from '@/types';
import { SortableOperationFields } from '@/types/operation';
import { OperationCompletedType } from '@/types/api/Operation';

import { MutationsTypes } from '@/store/operation/mutations';

import ListOperationsItem from '@/components/operations/ListOperationsItem.vue';

export default defineComponent({
  name: 'ListOperations',
  components: {
    ListOperationsItem,
  },
  props: {
    listType: {
      type: Number as PropType<OperationCompletedType>,
      default: OperationCompletedType.COMPLETED,
    },
  },
  setup(props) {
    const { dispatch, state, commit } = useStore();

    const selectedSort = reactive({
      field: 'date',
      sort: SortTypes.ASC,
    });

    const headers = computed(() => [
      { name: 'Дата', field: 'date', canSort: true },
      { name: 'Операция', field: 'type', canSort: true },
      { name: 'Культура', field: 'crop', canSort: false },
      { name: 'Качество', field: 'assessment', canSort: true },
    ]);

    const listOperations = computed(() =>
      state.operation.listOperations.filter(
        (el) => el.completed === props.listType,
      ),
    );

    const sortTypes = computed(() => SortTypes);

    const onChangeSort = (field: SortableOperationFields, canSort: boolean) => {
      if (!canSort) {
        return;
      }

      if (selectedSort.field === field) {
        selectedSort.sort =
          selectedSort.sort === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
      } else {
        selectedSort.sort = SortTypes.ASC;
        selectedSort.field = field;
      }

      commit(MutationsTypes.SORT_LIST_OPERATIONS, {
        field,
        sort: selectedSort.sort,
      });
    };

    onMounted(async () => {
      await dispatch(ActionTypes.GET_LIST_OPERATIONS);

      commit(MutationsTypes.SORT_LIST_OPERATIONS, {
        field: SortableOperationFields.DATE,
        sort: SortTypes.ASC,
      });
    });

    return {
      headers,
      listOperations,
      selectedSort,
      sortTypes,

      onChangeSort,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-operations {
  width: 100%;
  vertical-align: middle;
  border-spacing: unset;

  &__head-item {
    height: 40px;
    padding-left: 10px;
    font-weight: $font-bold;
    text-align: left;
    background: $color-grey-2;

    &:first-child {
      width: 15%;
    }

    &:nth-child(2) {
      width: 40%;
    }

    &:nth-child(3) {
      width: 22.5%;
    }

    &:last-child {
      width: 22.5%;
    }
  }

  &__head-name {
    text-transform: uppercase;

    &.is-sortable {
      cursor: pointer;
    }
  }

  &__sort {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 10px;
    border-top: 6px solid $color-grey-3;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    transition: all $transition;

    &.is-active {
      border-top-color: $color-blue;
    }

    &.is-desc {
      transform: rotate(180deg);
    }
  }
}
</style>
