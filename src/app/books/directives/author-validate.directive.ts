import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

import { ValidateFilterService } from '../services/validate-filter.service';
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

  constructor(
    private readonly _validateFilterService: ValidateFilterService,
  ) {}

  public validate(control: FormControl): ValidationErrors | null {
    return this._validateFilterService.validateAuthorInput(control, this.authors);
  }

}
