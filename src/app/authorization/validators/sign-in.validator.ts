import { Injector } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

import { UserService } from '../services/user.service';

export function signInValidator(): ValidatorFn {
  const error: ValidationErrors = { undefUser: true };

  const injector = Injector
    .create({ providers:
       [ { provide: UserService }],
    });

  const userService = injector.get(UserService);

  return (ctrl: AbstractControl): ValidationErrors | null => {
    const value = ctrl.value;

    if (value && value.login && value.password) {
      return userService.isTrueUser(value) ? null : error;
    }

    return null;
  };
}
