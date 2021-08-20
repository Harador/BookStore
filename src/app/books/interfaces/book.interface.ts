import { IAuthor } from '../../authors/interfaces/author.interface';
import { IGenre } from '../../genres/index';

export interface IBook {
  id: number;
  description: string;
  authorId: number;
  title: string;
  price: number;
  genres: IGenre[];
  previews: string[];
  image: string | null;
  writingDate: string;
  releaseDate: string;
  author?: IAuthor;
}
