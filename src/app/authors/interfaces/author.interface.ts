import { IBook } from '../../books/index';

export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
  books: IBook[];
}
