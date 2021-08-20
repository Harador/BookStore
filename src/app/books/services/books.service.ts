import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBook } from '../interfaces/book.interface';
import { IBooksFilterQuery } from '../interfaces/books-query-params.interface';
import { IListResponse } from '../../index';

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

  /**
   * get books list
   * @param page query parameter
   * @param limit query parameter
   * @returns list include books and meta
   */
  public gets(
    page: number = 1,
    limit: number = 10,
    filterQuery: IBooksFilterQuery,
    ): Observable<IListResponse> {
    if (filterQuery.author) {
      return this.getsByAuthorId(page, limit, filterQuery);
    }

    const queries = this._getTrueFilterQueries(filterQuery);

    const params = new HttpParams()
     .appendAll({ page, limit, ...queries });

    return this._http
      .get<IListResponse>(this._booksUrl, { params });
  }

  /**
   * get book from id
   * @param id book's id
   * @returns book
   */
  public get(id: number): Observable<IBook> {
    return this._http.get<IBook>(this._booksUrl + `/${id}`);
  }

  /**
   * get books list by author id
   * @param page query parameter
   * @param limit query parameter
   * @param filterQuery filter queries
   * @returns list include books and meta
   */
  public getsByAuthorId(
    page: number = 1,
    limit: number = 10,
    filterQuery: IBooksFilterQuery,
  ): Observable<IListResponse> {
    const queries = this._getTrueFilterQueries(filterQuery);
    const id = filterQuery.author;
    const params = new HttpParams()
     .appendAll({ page, limit, ...queries });

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
