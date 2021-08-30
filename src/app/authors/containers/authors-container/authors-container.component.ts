import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { AuthorsService } from '../../index';

import { IListResponse, IPageParams } from '@app';


@Component({
  selector: 'app-authors-container',
  templateUrl: './authors-container.component.html',
})
export class AuthorsContainerComponent implements OnInit {

  public authorsData$!: Observable<IListResponse>;

  private readonly _setAuthors$ = new Subject<Observable<IListResponse>>();

  private _queryParams!: IPageParams;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authorsService: AuthorsService,
  ) { }

  public ngOnInit(): void {
    this._initQueryParams();
    this._initAuthorsObservable();
  }

  public changePage(queryParams: IPageParams): void {
    this._queryParams = queryParams;
    this._setAuthors$.next();
  }

  private _initAuthorsObservable (): void {
    this.authorsData$ = this._setAuthors$
    .pipe(
      startWith(''),
      switchMap(() => this._authorsService.gets(this._queryParams)),
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
