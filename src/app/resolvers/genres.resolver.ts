import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { GenresService } from '@genres';

import { IListResponse } from '@app';

@Injectable()
export class GenresResolver implements Resolve<IListResponse> {

  constructor (private readonly _genresService: GenresService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<IListResponse> {
    return this._genresService.gets();
  }

}
