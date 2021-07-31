import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, pipe } from 'rxjs';

import { IBook } from '../interfaces/book.interface';
import { IAuthor } from '../../author/index';


@Injectable()
export class BookService {

  public books$ = new BehaviorSubject<IBook[]>([]);
  private readonly booksUrl: string = '/api/books';
  private readonly subscribe: any;

  constructor(private readonly http: HttpClient) {
    this.subscribe = this.getBooks().subscribe((books) => {
      this.books$.next(books.books);
      this.subscribe.unsubscribe();
    });
  }

  public getBooks(): Observable<any> {
    return this.http
      .get<any>(this.booksUrl);
  }

  public getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(this.booksUrl + `/${id}`);
  }

}
