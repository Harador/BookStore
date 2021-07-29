import { IBook } from '../../book/index';

export interface IAutor {
  id: number;
  first_name: string;
  last_name: string;
  books: IBook[];
}