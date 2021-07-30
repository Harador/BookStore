import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';

// import { tap } from 'rxjs/operators';

import { IBook } from '../interfaces/book.interface';
import { IAutor } from '../../autor/index';
import { BookModule } from './../book.module';

@Injectable()
export class BookService {

  public books$ = new BehaviorSubject<IBook[]>([]);
  private booksUrl: string = '/api/books';
  private subscribe: any;

  constructor(private http: HttpClient) {
    this.subscribe = this.getBooks().subscribe((books) => {
      this.books$.next(books.books);
      console.log(this.books$.value);
      this.subscribe.unsubscribe();
    })
  }

  public getBooks(): Observable<any> {
    return this.http
      .get<any>(this.booksUrl);
  }

}
