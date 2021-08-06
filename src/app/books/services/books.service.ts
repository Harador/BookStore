import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBook } from '../interfaces/book.interface';
import { IListResponse } from '../../index';

@Injectable()
export class BookService {

  private readonly booksUrl: string = '/api/books';

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  /**
   * get books list
   * @param page query parameter
   * @returns list include books and meta
   */
  public gets(page: number = 1): Observable<IListResponse> {
    const params = new HttpParams()
    .set('page', page);

    return this.http
      .get<IListResponse>(this.booksUrl, { params });
  }

  /**
   * get book from id
   * @param id book's id
   * @returns book
   */
  public get(id: number): Observable<IBook> {
    return this.http.get<IBook>(this.booksUrl + `/${id}`);
  }

}
