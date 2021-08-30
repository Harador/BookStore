export interface IPageParams {
  page: number;
  limit: number;
  records?: number;
}

// authorName, authorId, genre, minPrice, maxPrice
export interface IFiltration {
  [key: string]: string | number;
}

export type IQueriesParams = Partial<IPageParams> | IFiltration;
