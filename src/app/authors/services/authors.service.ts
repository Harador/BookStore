import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IListResponse } from '../../index';

@Injectable()
export class AuthorService {

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
  public gets(page: number = 1, limit: number = 10): Observable<IListResponse> {
    const params = new HttpParams()
    .appendAll({ page, limit });

    return this._http
      .get<IListResponse>(this.authorsUrl, { params });
  }

}
