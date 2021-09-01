import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { IAuthor, AuthorsService } from '../index';

@Injectable()
export class AuthorResolver implements Resolve<IAuthor> {

  constructor(
      private readonly _authorService: AuthorsService,
  ) {}

  public resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
  ): Observable<IAuthor> {
    const id = route.params.id;

    return this._authorService.get(id);
  }

}
