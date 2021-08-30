import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBook, IBooksFilterQuery } from '../index';

import { IListResponse, IQueriesParams } from '@app';

@Injectable({
  providedIn: 'root',
})
export class BooksService {

  private readonly _booksUrl: string = '/api/books';
  private readonly _authorsUrl: string = '/api/authors';

  private readonly _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  public gets(queriesParams: IQueriesParams): Observable<IListResponse> {
    const params = new HttpParams()
     .appendAll({ ...queriesParams });

    return this._http
      .get<IListResponse>(this._booksUrl, { params });
  }

  public get(id: number): Observable<IBook> {
    return this._http.get<IBook>(this._booksUrl + `/${id}`);
  }

  public getsByAuthorId(queriesParams: IQueriesParams): Observable<IListResponse> {
    // TODO take id from queries
    const id = 1;
    const params = new HttpParams()
     .appendAll({ ...queriesParams });

    return this._http
      .get<IListResponse>(`${this._authorsUrl}/${id}/books`, { params });
  }

  public create(book: Partial<IBook>): Observable<any> {
    const id = book.authorId;

    return this._http
      .post(`${this._authorsUrl}/${id}/books`, book, this._httpOptions);
  }

  /**
   * get true filters queries from filter
   * @param filter filter with params
   * @returns new queries
   */
  private _getTrueFilterQueries(filter: IBooksFilterQuery): any {
    const queries: any = {};

    if (filter.maxPrice
      && filter.minPrice) {
      queries['q[price_lteq]'] = filter.maxPrice;
      queries['q[price_gteq]'] = filter.minPrice;
    }

    if (filter.genre) {
      queries['q[genres_name_cont]'] = filter.genre;
    }

    return queries;
  }

}
