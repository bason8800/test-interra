export enum SortTypes {
  ASC = 1,
  DESC = -1,
}

export type Option = {
  label: string;
  value: string | number;
};

export type OptionsList = Array<Option>;
