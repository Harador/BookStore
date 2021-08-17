import { IBook } from '../../books';
import { IAuthor } from '../../authors';
import { IGenre } from '../../genres';

import { IMeta } from './meta.interface';

export interface IListResponse {
  meta: IMeta;
  books: IBook[];
  authors: IAuthor[];
  genres: IGenre[];
}
