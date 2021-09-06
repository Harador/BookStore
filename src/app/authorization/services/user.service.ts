import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public isLogged$ = new BehaviorSubject(false);

  constructor() {
    this.isLogged$.next(this.isLogged());
  }

  private get dbUser(): IUser {
    return JSON.parse(localStorage.user);
  }

  private set dbUser(user: IUser) {
    localStorage.user = JSON.stringify(user);
  }

  public signUp(login: string, password: string): boolean {
    const user = { login, password, isLogged: false };

    if (this.isTrueUser(user)) {
      return false;
    }
    user.isLogged = true;
    this.dbUser = user;
    this.isLogged$.next(true);

    return true;
  }

  public signIn(login: string, password: string): boolean {
    const logUser = { login, password, isLogged: false };

    if (this.isTrueUser(logUser)) {
      const user = this.dbUser;
      user.isLogged = true;
      this.dbUser = user;
      this.isLogged$.next(true);

      return true;
    }

    return false;
  }

  public logOut(): void {
    if (localStorage.user) {
      const user = this.dbUser;
      user.isLogged = false;
      this.dbUser = user;

      this.isLogged$.next(false);
    }
  }

  public isLogged(): boolean {
    if (!localStorage.user) {
      return false;
    }
    const user = this.dbUser;
    if (user && user.isLogged) {
      return true;
    }

    return false;
  }

  public isTrueUser(logUser: IUser): boolean {
    if (localStorage.user) {
      logUser.isLogged = false;

      return JSON.stringify(logUser) === localStorage.user;
    }

    return false;
  }

}
