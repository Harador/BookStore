import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from '@auth';


@Component({
  selector: 'app-toolbar-container',
  templateUrl: './toolbar-container.component.html',
})
export class ToolbarContainer implements OnInit, OnDestroy {

  @Output() public readonly toggleNavbar = new EventEmitter();

  public isUserLogged = false;

  private readonly _destroy$ = new Subject();

  constructor(
    private readonly _userService: UserService,
  ) { }

  public ngOnInit(): void {
    this._loggedSubscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public toggleNav(): void {
    this.toggleNavbar.emit();
  }

  public logOut(): void {
    this._userService.logOut();
  }

  private _loggedSubscribe(): void {
    this._userService.isLogged$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (isLogged) => {
          this.isUserLogged = isLogged;
        },
      );
  }

}
