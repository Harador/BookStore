import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.components.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthContainer implements OnInit, OnDestroy {

  @Input() public isSignInSelected = true;

  public isLogged = false;

  private readonly _destroy$ = new Subject();

  constructor(
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly _userService: UserService,
  ) { }

  public ngOnInit(): void {
    this._loggedSubscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public selectSignIn(): void {
    if (!this.isLogged) {
      this.isSignInSelected = true;
    }
  }

  public selectSignUp(): void {
    this.isSignInSelected = false;
  }

  public signIn(user: IUser): void {
    const isSignIn = this._userService.signIn(user.login, user.password);

    isSignIn
    ? this._navToBook()
    : this._snackBar.open('False user!', 'close', { duration: 5000 });
  }

  public signUp(user: IUser): void {
    const isSignUp = this._userService.signUp(user.login, user.password);

    isSignUp
    ? this._navToBook()
    : this._snackBar.open('This user already exist!', 'close', { duration: 5000 });
  }

  private _navToBook(): void {
    this._router.navigate(['/books']);
  }

  private _loggedSubscribe(): void {
    this._userService.isLogged$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (isLogged) => {
          this.isLogged = isLogged;
        },
      );
  }

}
