import { Injectable } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthValidateService {

  constructor(
    private readonly _userService: UserService,
  ) { }

  public signInValidator(): ValidatorFn {
    const error: ValidationErrors = { undefUser: true };

    return (ctrl: AbstractControl): ValidationErrors | null => {
      const value = ctrl.value;

      if (value && value.login && value.password) {
        return this._userService.isTrueUser(value) ? null : error;
      }

      return null;
    };
  }

  public signUpValidator(): ValidatorFn {
    const error: ValidationErrors = { regUser: true };

    return (ctrl: AbstractControl): ValidationErrors | null => {
      const value = ctrl.value;
      const user = { login: value.login, password: value.password };

      if (value.login && value.password && value.repPassword) {
        return this._userService.isTrueUser(user) ? error : null;
      }

      return null;
    };
  }

  public repeatPasswordValidator(
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


}
