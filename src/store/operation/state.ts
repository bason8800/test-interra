import { ListOperations } from '@/types/api/Operation';

export type State = {
  listOperations: ListOperations;
};

export const state: State = {
  listOperations: [],
};
