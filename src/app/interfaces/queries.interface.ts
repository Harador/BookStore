export interface IPageParams {
  page: number;
  limit: number;
  records?: number;
}

export interface IFiltration {
  [key: string]: string | number;
}

export type IQueriesParams = IPageParams | IFiltration;

// export interface IPartialQueries extends Partial<IQueries> {}
// genre: string;
// 'q[genres_name_cont]': string;
// author: number;
// 'q[name_cont]': string;
// minPrice: number;
// 'q[price_gteq]': number;
// maxPrice: number;
// 'q[price_lteq]': number;
