import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IListResponse } from '../../index';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {

  private readonly authorsUrl: string = '/api/authors';

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  /**
   * get books list
   * @param page query parameter
   * @param limit query parameter
   * @returns list include authors and meta
   */
  public gets(page: number = 1, limit: number = 10, name?: string): Observable<IListResponse> {
    let params;

    if (name) {
      params = new HttpParams()
    .appendAll({ page, limit, 'q[name_cont]': name });
    } else {
      params = new HttpParams()
    .appendAll({ page, limit, });
    }

    return this._http
      .get<IListResponse>(this.authorsUrl, { params });
  }

}
