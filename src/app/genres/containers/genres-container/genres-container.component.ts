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

  public setGenresObservable$ = new Subject<Observable<IListResponse>>();

  public queryParams!: IPageParams;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _genresService: GenresService,
  ) {
  }

  public ngOnInit(): void {
    this.initQueryParams();
    this.setGenresObservable();
  }

  public switchPage(queries: IPageParams): void {
    this.queryParams = queries;
    this.setGenresObservable$.next();
  }

  public setGenresObservable(): void {
    this.genresData$ = this.setGenresObservable$.asObservable()
      .pipe(
        startWith(''),
        switchMap(() => {
          return this._genresService.gets(this.queryParams);
        }),
      );
  }

  public initQueryParams(): void {
    this.queryParams = {
      page: 1,
      limit: 10,
      ...this._activatedRoute.snapshot.queryParams,
    };
  }

}
