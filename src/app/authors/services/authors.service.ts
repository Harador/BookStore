import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IListResponse, IQueriesParams } from '@app';


@Injectable({
  providedIn: 'root',
})
export class AuthorsService {

  private readonly authorsUrl: string = '/api/authors';

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  public gets(queryParams?: IQueriesParams): Observable<IListResponse> {
    const params = new HttpParams()
    .appendAll({ ...queryParams });

    return this._http
      .get<IListResponse>(this.authorsUrl, { params });
  }

}
