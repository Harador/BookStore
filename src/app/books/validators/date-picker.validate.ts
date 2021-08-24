import { AbstractControl, ValidationErrors } from '@angular/forms';


export function datePickerValidate(group: AbstractControl): ValidationErrors | null {
  const releaseCtrl = group.get('releaseDate');
  const writingCtrl = group.get('writingDate');

  const releaseDate = releaseCtrl?.value;
  const writingDate = writingCtrl?.value;

  const error = { falseReleaseDate: true };

  if (releaseDate && writingDate > releaseDate) {
    writingCtrl?.setErrors(error);
    releaseCtrl?.setErrors(error);

    return error;
  }

  writingCtrl?.setErrors(null);
  releaseCtrl?.setErrors(null);

  return null;
}
