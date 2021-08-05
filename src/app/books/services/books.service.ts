import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  public gets(): Observable<IListResponse> {
    return this.http
      .get<IListResponse>(this.booksUrl);
  }

  public get(id: number): Observable<IBook> {
    return this.http.get<IBook>(this.booksUrl + `/${id}`);
  }

}
