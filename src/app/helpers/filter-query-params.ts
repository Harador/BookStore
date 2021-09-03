import { IQueriesParams, IFiltration, IPageParams } from '@app';

export function filteredQueryParams(
    params: IFiltration & Partial<IPageParams>,
): IQueriesParams {
  const newParams: IFiltration = {};

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value) {
      newParams[key] = value;
    }
  });

  return newParams;
}
