import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, } from 'rxjs';

import { IGenre } from '../interfaces/genre.interface';

@Injectable()
export class GenreService{

  public genres$ = new BehaviorSubject<IGenre[]>([]);

  private readonly genresUrl: string = '/api/genres';
  private readonly subscribe: any;

  constructor(private readonly http: HttpClient) {
    this.subscribe = this.getgenres().subscribe((data) => {
      this.genres$.next(data.genres);
      this.subscribe.unsubscribe();
    });
  }

  public getgenres(): Observable<any> {
    return this.http
      .get<any>(this.genresUrl);
  }

}
