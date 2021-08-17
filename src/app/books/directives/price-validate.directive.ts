import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormGroup, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPrice]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PriceValidateDirective,
    multi: true,
  }],
})
export class PriceValidateDirective implements Validator {

  constructor() {}

  public validate(control: FormGroup): ValidationErrors | null {
    const min = control.value.min;
    const max = control.value.max;

    if (min > max) {
      return { priceError : true };
    }

    return null;
  }

}
