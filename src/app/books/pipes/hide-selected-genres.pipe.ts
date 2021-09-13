import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

import { IGenre } from '@genres';

@Pipe({
  name: 'hideSelectedGenres',
})
export class HideSelectedGenresPipe implements PipeTransform {

  public transform(genresList: IGenre[], selectedGenres: IGenre[]): IGenre[] {

    const isSelected = (genre: IGenre): boolean => {
      return selectedGenres.some((item: IGenre) => {
        return item.id === genre.id;
      });
    };

    if (genresList && selectedGenres) {
      genresList = genresList.filter((genre: IGenre) => {
        return !isSelected(genre);
      });
    }

    return genresList;
  }

}
