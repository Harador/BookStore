import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IListResponse } from '../../index';

@Injectable()
export class AuthorService {

  private readonly authorsUrl: string = '/api/authors';

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public gets(): Observable<IListResponse> {
    return this.http
      .get<IListResponse>(this.authorsUrl);
  }

}
