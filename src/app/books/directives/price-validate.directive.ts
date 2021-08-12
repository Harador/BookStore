import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormGroup, Validator, ValidationErrors } from '@angular/forms';

import { ValidateFilterService } from '../services/validate-filter.service';

@Directive({
  selector: '[appPrice]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PriceValidateDirective,
    multi: true,
  }],
})
export class PriceValidateDirective implements Validator {

  constructor(
    private readonly _validateFilterService: ValidateFilterService,
  ) {}
  public validate(control: FormGroup): ValidationErrors | null {
    return this._validateFilterService.validatePrice(control);
  }

}
