import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil, map, debounceTime, } from 'rxjs/operators';

import { AuthorService, IAuthor } from '../../../authors';
import { GenresService, IGenre } from '../../../genres';
import { IBooksFilterQuery } from '../../interfaces/books-query-params.interface';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.scss'],
})
export class BooksFilterComponent implements OnInit, OnDestroy {

  public authors: IAuthor[] = [];
  public genres?: IGenre[];

  public model: IBooksFilterQuery = {
    author: undefined,
    genre: undefined,
    maxPrice: 9900,
    minPrice: 0,
  };

  public readonly displayFullNameAndTakeId = this._displayFullNameAndTakeId.bind(this);

  private readonly _debounce$ = new Subject<string>();
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
      .subscribe((fullName) => {
        this.filterAuthors(fullName);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public closeDialog(): void {
    this._dialogRef.close(this.model);
  }

  public handleInput(fullName: string): any {
    this._debounce$.next(fullName);
  }

  public filterAuthors(fullName: string): void {
    const arrName = fullName.trim().toLowerCase().split(' ');
    const firstName = arrName[0];
    const lastName = arrName[1] || '';

    this._authorService.gets(1, 100)
      .pipe(
        map((list) => {
          return list.authors.filter((author) => {
            return author.first_name.toLowerCase()
              .includes(firstName)
              || author.last_name.toLowerCase()
                .includes(lastName);
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

  private _displayFullNameAndTakeId($event: IAuthor): string {
    if ($event) {
      this.model.author = $event.id;

      return `${$event.first_name } ${$event.last_name }`;
    }

    return '';
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
