import { Assessment } from '@/types/api/Operation';

export enum SortableOperationFields {
  TYPE = 'type',
  DATE = 'date',
  ASSESSMENT = 'assessment',
}

export type Field = {
  fieldId: number | string;
  crop: string;
  image: string;
  subtitle: string;
};

export type QualityItem = {
  assessment: Assessment;
  name: string;
};

export type QualityList = Array<QualityItem>;
