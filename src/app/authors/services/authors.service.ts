import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { IAuthor } from '../interfaces/author.interface';

@Injectable()
export class AuthorService {

  private readonly authorsUrl: string = '/api/authors';

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public get(): Observable<IAuthor[]> {
    return this.http
      .get<IAuthor[]>(this.authorsUrl)
      .pipe(
        pluck('authors'),
      );
  }

}
