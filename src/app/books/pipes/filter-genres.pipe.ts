import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

import { IGenre } from '../../genres';

@Pipe({
  name: 'filterGenres',
})
export class FilterGenresPipe implements PipeTransform {

  public transform(genres: IGenre[], form: FormArray): IGenre[] {
    if (genres && Array.isArray(form.value)) {
      genres = genres.filter((genre: IGenre) => {
        return !form.value.includes(genre);
      });
    }

    return genres;
  }

}
