import { ListOperations } from '@/types/operation';
import { OperationCompletedType } from '@/types/operation';

export type State = {
  listOperations: ListOperations;
  operationsType: OperationCompletedType;
};

export const state: State = {
  listOperations: [],
  operationsType: OperationCompletedType.COMPLETED,
};
