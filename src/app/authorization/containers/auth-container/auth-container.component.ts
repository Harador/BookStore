import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthContainer implements OnInit {

  @Input() public isSignInSelected = false;

  public isLogged = this._userService.isLogged();

  constructor(
    private readonly _userService: UserService,
  ) { }

  public ngOnInit(): void {
  }

}
