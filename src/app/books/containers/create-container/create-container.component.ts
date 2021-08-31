import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { AuthorsService, IAuthor } from '@authors';
import { GenresService, IGenre } from '@genres';

import { IBook, BooksService } from '../../index';

import { getTrueQueryParams, } from '@app';



@Component({
  selector: 'app-create-container',
  templateUrl: './create-container.component.html',
  styleUrls: ['./create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateContainer implements OnInit, OnDestroy {

  public authors!: IAuthor[];
  public genres!: IGenre[];

  private readonly _debounceInput$ = new Subject<string>();
  private readonly _destroy$ = new Subject();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authorService: AuthorsService,
    private readonly _genresService: GenresService,
    private readonly _booksService: BooksService,
  ) { }

  public ngOnInit(): void {
    this._debounceInputSubscribe();
    this._loadData();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createBook(book: IBook): void {
    this._booksService.create(book)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
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
