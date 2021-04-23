import { ActionTree } from 'vuex';
import { AugmentedActionContext } from '@/store/common-types';

import { State as RootState } from '@/store';

import { State } from '@/store/operation/state';
import { Mutations, MutationsTypes } from '@/store/operation/mutations';

import { fieldService } from '@/api';
import { Operation } from '@/classes/models/Operation';

export enum ActionTypes {
  GET_LIST_OPERATIONS = 'GET_LIST_OPERATIONS',
  ADD_OR_UPDATE_OPERATION = 'ADD_OPERATION',
}

type Context = AugmentedActionContext<State, Mutations<State>>;

export type Actions = {
  [ActionTypes.GET_LIST_OPERATIONS](context: Context): void;

  [ActionTypes.ADD_OR_UPDATE_OPERATION](
    context: Context,
    payload: Operation,
  ): void;
};

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.GET_LIST_OPERATIONS](context) {
    const operations = await fieldService.getOperations();
    context.commit(MutationsTypes.SET_LIST_OPERATIONS, operations);
  },

  async [ActionTypes.ADD_OR_UPDATE_OPERATION](context, payload) {
    await fieldService.saveOperation(payload);
    context.commit(MutationsTypes.ADD_OR_UPDATE_OPERATION, payload);
  },
};
