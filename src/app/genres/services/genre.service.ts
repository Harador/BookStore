import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { IGenre } from '../interfaces/genre.interface';

@Injectable()
export class GenreService {

  private readonly genresUrl: string = '/api/genres';

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public gets(): Observable<IGenre[]> {
    return this.http
      .get<IGenre[]>(this.genresUrl)
      .pipe(
        pluck('genres'),
      );
  }

}
