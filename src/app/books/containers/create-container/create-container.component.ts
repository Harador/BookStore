import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { debounceTime, startWith, switchMap, takeUntil, map } from 'rxjs/operators';

import { AuthorsService, IAuthor } from '@authors';
import { GenresService, IGenre } from '@genres';

import { IBook, BooksService } from '../../index';

import { getTrueQueryParams, } from '@app';
import { IListResponse } from 'interfaces/list-response.interface';
import { IQueriesParams } from 'interfaces/queries.interface';


@Component({
  selector: 'app-create-container',
  templateUrl: './create-container.component.html',
  styleUrls: ['./create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateContainer implements OnInit, OnDestroy {

  public authors$!: Observable<IListResponse>;

  private readonly _debounceAuthorsList$ = new Subject<string>();

  private readonly _destroy$ = new Subject();

  constructor(
    private readonly _authorsService: AuthorsService,
    private readonly _genresService: GenresService,
    private readonly _booksService: BooksService,
  ) { }

  public ngOnInit(): void {
    this._initAuthors$();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    
  }

  public getGenresList$ = (genreName?: string): Observable<IGenre[]> => {
    let queries: IQueriesParams = {};

    if(genreName){
      queries = getTrueQueryParams({ genreName })
    }

    return this._genresService.gets(queries)
      .pipe(
        map(data => data.genres)
      )
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
    this._debounceAuthorsList$.next(name);
  }

  private _initAuthors$(): void {

    this.authors$ =  this._debounceAuthorsList$.asObservable()
      .pipe(
        debounceTime(300),
        startWith(''),
        switchMap((authorName: string) => {
          let param: IQueriesParams = {};
          if(authorName){
             param = getTrueQueryParams({ authorName });  
          }
          return this._authorsService.gets(param);
        }),
      )
  }

}
