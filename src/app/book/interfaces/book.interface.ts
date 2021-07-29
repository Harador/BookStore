import { IGenre } from './genre.interface';
import { IAutor } from '../../autor/index';

export interface IBook{
  id: number;
  description: string;
  author_id: number;
  title: string;
  price: number;
  genres: IGenre[];
  previews: string[];
  image: string|null;
  writing_date: string;
  release_date: string;
  author?: IAutor;
}