import { createStore } from 'vuex';

import { State as OperationState } from '@/store/operation/state';

import { OperationModule, Store as OperationStore } from '@/store/operation';

export type State = {
  operation: OperationState;
};

export type Store = OperationStore;

export const store = createStore({
  modules: {
    operation: OperationModule,
  },
});

export function useStore(): Store {
  return store as Store;
}

export default store;
