import { IBook } from '@books';

export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
  books: IBook[];
}
