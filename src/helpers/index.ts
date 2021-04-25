import { routesList } from '@/router/routes';

export function enumKeys<
  O extends Record<string, unknown>,
  K extends keyof O = keyof O
>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export const getEditOperationRoutePath = (id: string): string => {
  return routesList.editOperation.path.replace(':id', id);
};
