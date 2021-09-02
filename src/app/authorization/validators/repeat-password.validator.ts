import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function repeatPassword(
  getAnCtrl: () => AbstractControl | null,
): ValidatorFn {
  const error = { notEqPas: true };

  return (ctrl: AbstractControl): ValidationErrors | null => {
    const anCtrl = getAnCtrl();
    const val1 = ctrl?.value;
    const val2 = anCtrl?.value;

    if (!val1 && !val2 || !anCtrl) {
      return null;
    }

    if (val1 !== val2) {
      ctrl.setErrors(error);
      anCtrl.setErrors(error);

      return error;
    } else if (val1 === val2) {
      ctrl.setErrors(null);
      anCtrl?.setErrors(null);
    }

    return null;
  };
}
