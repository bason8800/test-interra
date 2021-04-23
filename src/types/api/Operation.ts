import { Operation } from '@/classes/models/Operation';

export enum OperationType {
  PLOWING = 0, // Вспашка
  BOWLING = 1, // Боронование
  FERTILIZATION = 2, // Внесение удобрений
  WATERING = 3, // Полив
  RIGGING = 4, // Прикатывание
  HARVESTING = 5, // Сбор урожая
}

export enum Assessment {
  EXCELLENT = 0, // Отлично
  SATISFACTORILY = 1, // Удовлетворительно
  BADLY = 2, // Плохо
}

export enum OperationCompletedType {
  COMPLETED,
  NOT_COMPLETED,
}

export type ListOperations = Array<Operation>;
