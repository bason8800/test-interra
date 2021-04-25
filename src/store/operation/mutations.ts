import { MutationTree } from 'vuex';

import { SortTypes } from '@/types';
import { SortableOperationFields } from '@/types/operation';
import { ListOperations, OperationCompletedType } from '@/types/operation';

import { State } from '@/store/operation/state';
import { TDate } from '@/classes/models/TDate';
import { Operation } from '@/classes/models/Operation';

export enum MutationsTypes {
  'SET_LIST_OPERATIONS' = 'SET_LIST_OPERATIONS',
  'SORT_LIST_OPERATIONS' = 'SORT_LIST_OPERATIONS',
  'ADD_OR_UPDATE_OPERATION' = 'ADD_OR_UPDATE_OPERATION',
  'SET_OPERATIONS_TYPE' = 'SET_OPERATIONS_TYPE',
}

export type Mutations<S> = {
  [MutationsTypes.SET_LIST_OPERATIONS](state: S, payload: ListOperations): void;

  [MutationsTypes.SORT_LIST_OPERATIONS](
    state: S,
    payload: { sort: SortTypes; field: SortableOperationFields },
  ): void;

  [MutationsTypes.ADD_OR_UPDATE_OPERATION](state: S, payload: Operation): void;

  [MutationsTypes.SET_OPERATIONS_TYPE](
    state: S,
    payload: OperationCompletedType,
  ): void;
};

export const mutations: MutationTree<State> & Mutations<State> = {
  [MutationsTypes.SET_LIST_OPERATIONS](state, payload) {
    state.listOperations = payload;
  },

  [MutationsTypes.SORT_LIST_OPERATIONS](state, { field, sort }) {
    const createDate = (date: TDate) =>
      new Date(date.year, date.month - 1, date.day);

    state.listOperations.sort((a, b) => {
      let elOne;
      let elTwo;

      if (field === SortableOperationFields.DATE) {
        elOne = createDate(a[field] as TDate);
        elTwo = createDate(b[field] as TDate);
      } else {
        elOne = a[field] ?? 3;
        elTwo = b[field] ?? 3;
      }

      if (elOne === elTwo) {
        return 0;
      }

      const check = sort === SortTypes.ASC ? elOne > elTwo : elOne < elTwo;

      return check ? SortTypes.ASC : SortTypes.DESC;
    });
  },

  [MutationsTypes.ADD_OR_UPDATE_OPERATION](state, payload) {
    const index = state.listOperations.findIndex(({ id }) => id === payload.id);

    if (index !== -1) {
      state.listOperations.splice(index, 1, payload);
      return;
    }

    state.listOperations.push(payload);
  },

  [MutationsTypes.SET_OPERATIONS_TYPE](state, payload) {
    state.operationsType = payload;
  },
};
