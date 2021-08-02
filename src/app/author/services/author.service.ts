import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { IAuthor } from '../interfaces/author.interface';

@Injectable()
export class AuthorService {

  public authors$ = new BehaviorSubject<IAuthor[]>([]);

  private readonly authorsUrl: string = '/api/authors';
  private readonly subscribe: any;

  constructor(private readonly http: HttpClient) {
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
