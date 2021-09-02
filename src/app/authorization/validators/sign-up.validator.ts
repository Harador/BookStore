import { Injector } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

import { UserService } from '../services/user.service';

export function signUpValidator(): ValidatorFn {
  const error: ValidationErrors = { regUser: true };

  const injector = Injector
    .create({ providers:
       [ { provide: UserService }],
    });

  const userService = injector.get(UserService);

  return (ctrl: AbstractControl): ValidationErrors | null => {
    const value = ctrl.value;
    const user = { login: value.login, password: value.password };

    if (value.login && value.password && value.repPassword) {
      return userService.isTrueUser(user) ? error : null;
    }

    return null;
  };
}
