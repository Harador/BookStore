import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';

// import { tap } from 'rxjs/operators';

import { IBook } from '../interfaces/book.interface';
import { IAutor } from '../../autor/index';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public books$ = new BehaviorSubject<IBook[]>([]);
  private booksUrl: string = '/api/books';
  private subscribe: any;

  constructor(private http: HttpClient) {
    this.subscribe = this.getBooks().subscribe((books) => {
      this.books$.next(books);
      this.subscribe.unsubscribe();
    })
  }

  public getBooks(): Observable<IBook[]> {
    return this.http
      .get<IBook[]>(this.booksUrl);
  }
}
