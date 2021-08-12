import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    author: '',
    genre: '',
    maxPrice: 9900,
    minPrice: 0,
  };

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _authorService: AuthorService,
    private readonly _genresService: GenresService,
  ) { }

  public ngOnInit(): void {
    this._loadData();
  }
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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
