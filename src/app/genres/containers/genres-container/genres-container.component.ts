import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { GenresService, IGenre } from '../../index';
import { IListResponse } from '../../../index';


@Component({
  selector: 'genres-container',
  templateUrl: './genres-container.component.html',
})
export class GenresContainer implements OnInit {

  public genresData$!: Observable<IListResponse>;
  public genres$ = new Subject<IListResponse>();

  public queryParams = {
    page: 1,
    limit: 10,
  };

  constructor(
    private readonly _genresService: GenresService,
  ) {
    this.getGenres();
  }

  public ngOnInit(): void {
  }

  public getGenres(): void {
    this.genresData$ = this.genres$.asObservable()
      .pipe(
        startWith(''),
        switchMap(() => {
          return this._genresService.gets(this.queryParams);
        }),
      );
  }

}
