import { Module } from 'vuex';

import { State as RootState } from '@/store';

import { CommonStore } from '@/store/common-types';

import { State, state } from './state';
import { Mutations, mutations } from './mutations';
import { Actions, actions } from '@/store/operation/actions';

export type Store<S = { operation: State }> = CommonStore<
  S,
  Mutations<S>,
  Actions
>;

export const OperationModule: Module<State, RootState> = {
  state,
  mutations,
  actions,
};
