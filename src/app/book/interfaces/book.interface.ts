import { IAuthor } from '../../author/interfaces/author.interface';

import { IGenre } from './genre.interface';

export interface IBook {
  id: number;
  description: string;
  author_id: number;
  title: string;
  price: number;
  genres: IGenre[];
  previews: string[];
  image: string | null;
  writing_date: string;
  release_date: string;
  author?: IAuthor;
}
