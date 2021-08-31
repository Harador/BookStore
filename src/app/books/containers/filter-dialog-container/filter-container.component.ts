import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { AuthorsService, IAuthor } from '@authors';
import { GenresService, IGenre } from '@genres';

import { IQueriesParams, getTrueQueryParams, filteredQueryParams } from '@app';


@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDialogContainer implements OnInit, OnDestroy {

  public authors!: IAuthor[];
  public genres!: IGenre[];

  private readonly _debounceInput$ = new Subject<string>();
  private readonly _destroy$ = new Subject();

  constructor(
    private readonly _router: Router,
    private readonly _dialogRef: MatDialogRef<FilterDialogContainer>,
    private readonly _authorService: AuthorsService,
    private readonly _genresService: GenresService,
  ) { }

  public ngOnInit(): void {
    this._debounceInputSubscribe();
    this._loadData();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submitFilter(data: IQueriesParams): void {
    const queryParams = filteredQueryParams(data);

    this._router.navigate(['/books'], {
      queryParams,
    });
    this._dialogRef.close();
  }

  public sortAuthors(name: string): void {
    name = name.trim().toLowerCase().split(' ')[0];
    this._debounceInput$.next(name);
  }

  private _debounceInputSubscribe(): void {
    this._debounceInput$
      .pipe(
        debounceTime(500),
        switchMap((authorName: string) => {
          const param = getTrueQueryParams({ authorName });

          return this._authorService.gets(param);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.authors = list.authors;
      });
  }

  private _loadData(): void {
    this._authorService.gets()
      .pipe(
       takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.authors = list.authors;
      });

    this._genresService.gets()
      .pipe(
       takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.genres = list.genres;
      });
  }

}
