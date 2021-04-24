import { ListOperations } from '@/types/api/Operation';
import { OperationCompletedType } from '@/types/api/Operation';

export type State = {
  listOperations: ListOperations;
  operationsType: OperationCompletedType;
};

export const state: State = {
  listOperations: [],
  operationsType: OperationCompletedType.COMPLETED,
};
