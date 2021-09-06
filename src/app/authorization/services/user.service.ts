import { Injectable } from '@angular/core';

import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {

  constructor() { }

  private get dbUser(): IUser {
    return JSON.parse(localStorage.user);
  }

  private set dbUser(user: IUser) {
    location.href = 'http://localhost:4200/books';
    localStorage.user = JSON.stringify(user);
  }

  public signUp(login: string, password: string): void {
    const user = { login, password, isLogged: true };
    this.dbUser = user;
  }

  public signIn(login: string, password: string): void {
    const logUser = { login, password, isLogged: false };

    if (this.isTrueUser(logUser)) {
      const user = this.dbUser;
      user.isLogged = true;
      this.dbUser = user;
    }
  }

  public logOut(): void {
    if (localStorage.user) {
      const user = this.dbUser;
      user.isLogged = false;
      this.dbUser = user;
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
