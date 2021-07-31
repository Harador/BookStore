import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';

import { IAuthor } from '../interfaces/author.interface';

@Injectable()
export class AuthorService {

  public authors$ = new BehaviorSubject<IAuthor[]>([]);
  private authorsUrl: string = '/api/authors';
  private subscribe: any;

  constructor(private http: HttpClient) {
    this.subscribe = this.getAuthors().subscribe((authors) => {
      this.authors$.next(authors.authors);
      this.subscribe.unsubscribe();
    });
  }

  public getAuthors(): Observable<any> {
    return this.http
      .get<any>(this.authorsUrl);
  }

}
