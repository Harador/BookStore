import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserService } from '@auth';


@Component({
  selector: 'app-toolbar-container',
  templateUrl: './toolbar-container.component.html',
})
export class ToolbarContainer implements OnInit {
  @Output() public readonly toggleNavbar = new EventEmitter();

  public isUserLogged = false;

  constructor(
    private readonly _userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.isUserLogged = this._userService.isLogged();
  }

  public toggleNav(): void {
    this.toggleNavbar.emit();
  }

  public logOut(): void {
    this._userService.logOut();
  }

}
