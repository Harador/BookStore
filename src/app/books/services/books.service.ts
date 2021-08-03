import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { IBook } from '../interfaces/book.interface';

@Injectable()
export class BookService {

  private readonly booksUrl: string = '/api/books';

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public gets(): Observable<IBook[]> {
    return this.http
      .get<IBook[]>(this.booksUrl)
      .pipe(
        pluck('books'),
      );
  }

  public get(id: number): Observable<IBook> {
    return this.http.get<IBook>(this.booksUrl + `/${id}`);
  }

}
