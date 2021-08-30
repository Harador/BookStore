import {
   Component,
   OnDestroy,
   OnInit,
   Output,
   EventEmitter,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, switchMap, } from 'rxjs/operators';

import { IListResponse } from '../../..';
import { AuthorsService, IAuthor } from '../../../authors';
import { GenresService, IGenre } from '../../../genres';
import { IBooksFilterQuery } from '../../interfaces/books-query-params.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {

  @Output() public readonly closeDialog = new EventEmitter();

  public authors: IAuthor[] = [];
  public genres?: IGenre[];

  public model: IBooksFilterQuery = {
    author: undefined,
    genre: undefined,
    maxPrice: 9900,
    minPrice: 0,
  };

  public readonly displayFullNameAndTakeId = this._displayFullNameAndTakeId.bind(this);

  private readonly _debounceInput$ = new Subject<string>();
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _authorService: AuthorsService,
    private readonly _genresService: GenresService,
  ) {
  }

  public ngOnInit(): void {
    this._loadData();
    this._debounceInputSubscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public closeThisDialog(): void {
    this.closeDialog.emit();
  }

  public handleInput(fullName: string): any {
    this._debounceInput$.next(fullName);
  }

  public getFullName(author: IAuthor): string {
    return `${author.firstName} ${author.lastName}`;
  }

  public formatLabel(value: number): string | number {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }

    return value;
  }

  private _debounceInputSubscribe(): void {
    this._debounceInput$
      .pipe(
        debounceTime(500),
        switchMap((name: string) => {
          return this._filterAuthors$(name);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.authors = list.authors;
      });
  }

  private _filterAuthors$(fullName: string): Observable<IListResponse> {
    // const arrName = fullName.trim().toLowerCase().split(' ');
    // const firstName = arrName[0];

    return this._authorService.gets({});
  }

  private _displayFullNameAndTakeId($event: IAuthor): string {
    if ($event) {
      this.model.author = $event.id;

      return `${$event.firstName } ${$event.lastName }`;
    }

    return '';
  }

  private _loadData(): void {
    this._authorService.gets({})
      .pipe(
       takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.authors = list.authors;
      });

    this._genresService.gets({})
      .pipe(
       takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.genres = list.genres;
      });
  }

}
