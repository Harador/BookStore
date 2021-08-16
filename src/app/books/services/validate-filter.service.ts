import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

import { IAuthor } from '../../authors';

@Injectable()
export class ValidateFilterService {

  constructor() { }

  public validatePrice(control: FormGroup): null | ValidationErrors {
    const min = control.value.min;
    const max = control.value.max;

    if (min > max) {
      return { priceError : true };
    }

    return null;
  }

  public validateAuthorInput(
    control: AbstractControl,
    authors: IAuthor[] = [],
    ): null | ValidationErrors {
    if (!control.touched && control.pristine
       || !control.value
       || this._isTrueAuthor(authors, control.value)) {
      return null;
    }

    return { unknowAuthor: true };
  }


  private _isTrueAuthor(authors: IAuthor[], selectAuthor: IAuthor): boolean {
    return authors.some((author) => {
      return author === selectAuthor;
    });
  }

}
