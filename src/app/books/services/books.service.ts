import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBook } from '../interfaces/book.interface';
import { IListResponse } from '../../index';

@Injectable()
export class BookService {

  private readonly booksUrl: string = '/api/books?page=';
  private readonly bookUrl: string = '/api/books';
  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public gets(page: number = 1): Observable<IListResponse> {
    return this.http
      .get<IListResponse>(this.booksUrl + `${page}`);
  }

  public get(id: number): Observable<IBook> {
    return this.http.get<IBook>(this.bookUrl + `/${id}`);
  }

}
