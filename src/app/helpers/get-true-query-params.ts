import { IFiltration, IPageParams, IQueriesParams } from '../index';

export function getTrueQueryParams(
    params: IFiltration & Partial<IPageParams>,
): IQueriesParams {
  const trueParams: IFiltration = {};

  Object.keys(params).forEach((key) => {
    switch (key) {
      case 'genre': {
        trueParams['q[genres_name_cont]'] = params.genre;
        break;
      }
      case 'authorName':
      case 'genreName': {
        trueParams['q[name_cont]'] = params.authorName || params.genreName;
        break;
      }
      case 'minPrice': {
        trueParams['q[price_gteq]'] = params.minPrice;
        break;
      }
      case 'maxPrice': {
        trueParams['q[price_lteq]'] = params.maxPrice;
        break;
      }
      default: {
        trueParams[key] = params[key];
        break;
      }
    }
  });

  return trueParams;
}
