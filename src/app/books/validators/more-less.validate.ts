import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function moreAndLess(
  getAnCtrl: () => AbstractControl | null,
  isMore?: true,
): ValidatorFn {
  const error = { moreLessErr: true };

  return (ctrl: AbstractControl): ValidationErrors | null => {
    const anCtrl = getAnCtrl();

    const value = ctrl?.value;
    const anValue = anCtrl?.value;

    if (!(anCtrl && anValue && value)) {
      return null;
    }

    if (
          (isMore && value < anValue)
          || (!isMore && value > anValue)
          || value === anValue
    ) {
      anCtrl.setErrors(error);

      return error;
    }
    anCtrl.setErrors(null);

    return null;
  };
}
