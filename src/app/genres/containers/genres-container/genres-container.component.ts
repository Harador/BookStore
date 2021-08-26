import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { GenresService } from '../../index';
import { IListResponse, IPageParams } from '../../../index';


@Component({
  selector: 'genres-container',
  templateUrl: './genres-container.component.html',
})
export class GenresContainer implements OnInit {

  public genresData$!: Observable<IListResponse>;

  private readonly _setGenres$ = new Subject<Observable<IListResponse>>();

  private _queryParams!: IPageParams;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _genresService: GenresService,
  ) {
  }

  public ngOnInit(): void {
    this._initQueryParams();
    this._initGenresObservable();
  }

  public switchPage(queries: IPageParams): void {
    this._queryParams = queries;
    this._setGenres$.next();
  }

  private _initGenresObservable(): void {
    this.genresData$ = this._setGenres$.asObservable()
      .pipe(
        startWith(''),
        switchMap(() => {
          return this._genresService.gets(this._queryParams);
        }),
      );
  }

  private _initQueryParams(): void {
    this._queryParams = {
      page: 1,
      limit: 10,
      ...this._activatedRoute.snapshot.queryParams,
    };
  }

}
