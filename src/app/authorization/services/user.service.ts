import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  public sugnUp(login: string, password: string): void {
    localStorage.user = {
      login,
      password,
      isLogged: true,
    };
  }

  public signIn(login: string, password: string): void {
    const logUser = { login, password, isLogged: false };
    const dbUser = localStorage.user;

    if (dbUser && this.isTrueUser(dbUser, logUser)) {
      localStorage.user.isLogged = true;
    }
  }

  public logOut(): void {
    if (localStorage.user) {
      localStorage.user.isLogged = false;
    }
  }

  public isLogged(): boolean {
    if (localStorage.user && localStorage.user.isLogged) {
      return true;
    }

    return false;
  }

  public isTrueUser(obj1: object, obj2: object): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

}
