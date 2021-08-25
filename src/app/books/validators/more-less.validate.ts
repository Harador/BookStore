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

//   const releaseCtrl = group.get('releaseDate');
//   const writingCtrl = group.get('writingDate');
//   console.log(releaseCtrl);
  
//   const releaseDate = releaseCtrl?.value;
//   const writingDate = writingCtrl?.value;

//   const error = { falseReleaseDate: true };

//   if (releaseDate && writingDate > releaseDate) {
//     writingCtrl?.setErrors(error);
//     releaseCtrl?.setErrors(error);

//     return error;
//   }

//   writingCtrl?.setErrors(null);
//   releaseCtrl?.setErrors(null);

//   return null;

