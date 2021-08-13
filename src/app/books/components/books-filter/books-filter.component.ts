import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil, map, debounceTime, } from 'rxjs/operators';


import { AuthorService, IAuthor } from '../../../authors';
import { GenresService, IGenre } from '../../../genres';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss'],
})
export class BooksFilterComponent implements OnInit, OnDestroy {

  public authors: IAuthor[] = [];
  public genres?: IGenre[];

  public model = {
    author: '',
    genre: '',
    maxPrice: 9900,
    minPrice: 0,
  };

  private readonly _debounce$ = new Subject<void>();
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _dialogRef: MatDialogRef<BooksFilterComponent>,
    private readonly _authorService: AuthorService,
    private readonly _genresService: GenresService,
  ) {
  }

  public ngOnInit(): void {
    this._loadData();

    this._debounce$
      .pipe(
        debounceTime(500),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.filterAuthors();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public closeDialog(): void {
    // search author by model's author name
    const selectAuthor = this.authors.find((author) => {
      return this.getFullName(author)
        .toLowerCase() === (this.model.author.toLowerCase());
    });
    // send model with author's id instead of his fullname
    this._dialogRef.close({
      ...this.model,
      author: selectAuthor?.id || 0,
    });
  }

  public handleInput(): void {
    this._debounce$.next();
  }

  public filterAuthors(): void {
    this._authorService.gets(1, 100)
      .pipe(
        map((list) => {
          return list.authors.filter((author) => {
            return this.getFullName(author).toLowerCase()
              .includes(this.model.author.toLowerCase());
          });
        }),
        takeUntil(this._destroy$),
      )
      .subscribe((authors) => {
        this.authors = authors;
      });
  }

  public getFullName(author: IAuthor): string {
    return `${author.first_name} ${author.last_name}`;
  }

  public formatLabel(value: number): string | number {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }

    return value;
  }

  private _loadData(): void {
    this._authorService.gets(1, 100)
      .pipe(
       takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.authors = list.authors;
      });

    this._genresService.gets(1, 100)
      .pipe(
       takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.genres = list.genres;
      });
  }

}
