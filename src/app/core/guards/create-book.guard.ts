import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { UserService } from '@auth';

@Injectable()
export class CreateBookGuard implements CanActivate {

  constructor(
      private readonly _userService: UserService,
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): boolean {
    return this._userService.isLogged();
  }

}
