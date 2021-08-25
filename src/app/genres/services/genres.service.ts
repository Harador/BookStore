import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IListResponse, IQueries } from '../..';


@Injectable({
  providedIn: 'root',
})
export class GenresService {

  private readonly genresUrl: string = '/api/genres';

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
  public gets(queries: Partial<IQueries>): Observable<IListResponse> {
    return this._http
      .get<IListResponse>(this.genresUrl, { params: queries });
  }

}
