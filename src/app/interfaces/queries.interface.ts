export interface IQueries {
  page: number;
  limit: number;
  records: number;
  genre: string;
  'q[genres_name_cont]': string;
  author: number;
  'q[name_cont]': string;
  minPrice: number;
  'q[price_gteq]': number;
  maxPrice: number;
  'q[price_lteq]': number;
}
