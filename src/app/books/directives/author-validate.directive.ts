import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

import { IAuthor } from '../../authors';

@Directive({
  selector: '[appAuthor]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AuthorValidateDirective,
    multi: true,
  }],
})
export class AuthorValidateDirective implements Validator {

  @Input() public authors: IAuthor[] = [];

  constructor() {}

  public validate(control: FormControl): ValidationErrors | null {
    if (!control.touched && control.pristine
        || !control.value
        || this._isTrueAuthor(this.authors, control.value)) {
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
