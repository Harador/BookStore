import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

import { IGenre } from '@genres';

@Pipe({
  name: 'filterGenres',
})
export class FilterGenresPipe implements PipeTransform {

  public transform(genresList: IGenre[], group: FormArray): IGenre[] {
    if (genresList && Array.isArray(group.value)) {
      genresList = genresList.filter((genre: IGenre) => {
        return !group.value.includes(genre);
      });
    }

    return genresList;
  }

}
