import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { GenresService } from '@genres';

import { IListResponse } from '@app';

export class GenresResolver implements Resolve<Observable<IListResponse>> {

  constructor (private readonly _genresService: GenresService) {}

  public resolve(): Observable<IListResponse> {
    return this._genresService.gets();
  }

}
