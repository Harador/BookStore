import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil, } from 'rxjs/operators';

import { BooksService } from '@books';

import { IListResponse, IQueriesParams, getTrueQueryParams } from '@app';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksContainer implements OnInit, OnDestroy {

  public booksData$!: Observable<IListResponse>;

  private _queryParams!: IQueriesParams;

  private readonly _setBooks$ = new Subject<Observable<IListResponse>>();
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _booksService: BooksService,
  ) { }

  public ngOnInit(): void {
    this._initQueries();
    this._setBooksObservable();
    this._subscribeQueriesAndChangeObservable();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _setBooksObservable(): void {
    this.booksData$ = this._setBooks$.asObservable()
    .pipe(
      startWith(''),
      switchMap(() => this._booksService.gets(this._queryParams)),
    );
  }

  private _initQueries(): void {
    this._queryParams = {
      page: 1,
      limit: 10,
      ...this._activatedRoute.snapshot.queryParams,
    };
  }

  private _subscribeQueriesAndChangeObservable(): void {
    this._activatedRoute.queryParams
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((params) => {
        window.scrollTo(0, 0);
        this._queryParams = getTrueQueryParams(params);
        this._setBooks$.next();
      });
  }

}
