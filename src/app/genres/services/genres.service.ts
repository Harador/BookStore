import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IListResponse, IQueriesParams } from '@app';

@Injectable({
  providedIn: 'root',
})
export class GenresService {

  private readonly _genresUrl: string = '/api/genres';

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  public gets(queries?: IQueriesParams): Observable<IListResponse> {
    const params = new HttpParams().appendAll({ ...queries });

    return this._http
      .get<IListResponse>(this._genresUrl, { params });
  }

}
