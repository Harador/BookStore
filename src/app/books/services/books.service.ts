import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBook } from '../interfaces/book.interface';
import { IListResponse } from '../../index';

@Injectable()
export class BookService {

  private readonly booksUrl: string = '/api/books';

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
  public gets(page: number = 1, limit: number = 10): Observable<IListResponse> {
    const params = new HttpParams()
    .appendAll({ page, limit });

    return this._http
      .get<IListResponse>(this.booksUrl, { params });
  }

  /**
   * get book from id
   * @param id book's id
   * @returns book
   */
  public get(id: number): Observable<IBook> {
    return this._http.get<IBook>(this.booksUrl + `/${id}`);
  }

}
