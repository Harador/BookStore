import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthContainer implements OnInit {

  @Input() public isSignInSelected = true;

  public isLogged = this._userService.isLogged();

  constructor(
    private readonly _userService: UserService,
  ) { }

  public ngOnInit(): void {
  }

  public signIn(user: IUser): void {
    this._userService.signIn(user.login, user.password);
  }

  public signUp(user: IUser): void {
    this._userService.sugnUp(user.login, user.password);
  }

}
