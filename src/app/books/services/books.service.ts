import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBook } from '../index';

import { IListResponse, IFiltration, IPageParams } from '@app';


@Injectable({
  providedIn: 'root',
})
export class BooksService {

  private readonly _booksUrl: string = '/api/books';
  private readonly _authorsUrl: string = '/api/authors';

  private readonly _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private readonly _http: HttpClient,
  ) {
  }

  public gets(queriesParams?: IFiltration & Partial<IPageParams>): Observable<IListResponse> {
    if (queriesParams?.authorId) {
      return this.getsByAuthorId(queriesParams);
    }

    const params = new HttpParams()
     .appendAll({ ...queriesParams });

    return this._http
      .get<IListResponse>(this._booksUrl, { params });
  }

  public get(id: number): Observable<IBook> {
    return this._http.get<IBook>(this._booksUrl + `/${id}`);
  }

  public getsByAuthorId(queriesParams: IFiltration): Observable<IListResponse> {
    const id = queriesParams.authorId;
    const params = new HttpParams()
     .appendAll({ ...queriesParams });

    return this._http
      .get<IListResponse>(`${this._authorsUrl}/${id}/books`, { params });
  }

  public create(book: Partial<IBook>): Observable<any> {
    const id = book.authorId;

    return this._http
      .post(`${this._authorsUrl}/${id}/books`, book, this._httpOptions);
  }


}
