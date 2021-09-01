import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
})
export class AuthContainer implements OnInit {

  public isLogged = this._userService.isLogged();

  constructor(
    private readonly _userService: UserService,
  ) { }

  public ngOnInit(): void {
  }

}
