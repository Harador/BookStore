import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autocomplite',
})
export class AutocomplitePipe implements PipeTransform {

  public transform(authors: any[] = [], value: string | null): any {
    if (value) {
      return authors.filter((author) => {
        const fullName = `${author.first_name} ${author.last_name}`.toLowerCase();

        return fullName.includes(value.toLowerCase());
      });
    }

    return authors;
  }

}
