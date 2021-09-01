import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { BooksService } from '@books';

import { IListResponse } from '@app';

@Injectable()
export class AuthorBooksResolver implements Resolve<IListResponse> {

  constructor(
      private readonly _booksService: BooksService,
  ) {}

  public resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
  ): Observable<IListResponse> {
    const id = route.params.id;

    return this._booksService.getsByAuthorId({ limit: 100, authorId: id });
  }

}
