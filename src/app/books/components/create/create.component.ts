import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, AbstractControl, FormArray, Validators, FormGroup } from '@angular/forms';

import { Observable, Subject, pipe } from 'rxjs';
import { takeUntil, debounceTime, switchMap } from 'rxjs/operators';

import { AuthorsService, IAuthor } from '../../../authors';
import { GenresService, IGenre } from '../../../genres';
import { IBook, BooksService } from '../../';
import { IListResponse } from '../../../';
import { moreAndLess } from '../../validators/more-less.validate';


@Component({
  selector: 'app-book-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class BookCreateComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

  public authorsList!: IAuthor[];
  public genresList!: IGenre[];

  public readonly displayFullNameAndTakeId = this._displayFullNameAndTakeId.bind(this);

  private readonly _destroy$ = new Subject<void>();
  private readonly _debounceInput$ = new Subject<string>();

  constructor(
    private readonly _location: Location,
    private readonly _fb: FormBuilder,
    private readonly _authorsService: AuthorsService,
    private readonly _genresService: GenresService,
    private readonly _booksService: BooksService,
  ) { }

  public get genres(): FormArray {
    return this.form?.get('genres') as FormArray;
  }

  public get releaseCtrl(): AbstractControl | null {
    return this.form?.get('releaseDate');
  }

  public get writingCtrl(): AbstractControl | null {
    return this.form?.get('writingDate');
  }

  public get isAddGenreDisabled(): boolean {
    const value = this.genres.value;

    return !(value[value.length - 1]);
  }

  public ngOnInit(): void {
    this.initForm();
    this._loadData();
    this._debounceInputSubscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public initForm(): void {
    this.form = this._fb.group({
      title: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(100)]],
      author: [null, Validators.required],
      genres: this._fb.array([
        this._fb.control(
          null,
          Validators.required,
        ),
      ]),
      description: ['', Validators.minLength(10)],
      writingDate: [
        null,
        [
          Validators.required,
          moreAndLess(() => this.releaseCtrl),
        ],
      ],
      releaseDate: [
        null,
        [
          Validators.required,
          moreAndLess(() => this.writingCtrl, true),
        ],
      ],
    });
  }

  public getFullName(author: IAuthor): string {
    return `${author.firstName} ${author.lastName}`;
  }

  public deleteGenreSelect(index: number): void {
    this.genres.removeAt(index);
  }

  public addGenreCtrl(): void {
    this.genres.push(this._fb.control(
      null,
      Validators.required,
    ));
  }

  public submit(): void {
    const value = this.form.value;
    const book: Partial<IBook> = {
      ...value,
      authorId: value.author.id,
    };
    this._booksService.create(book)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((res) => {
        this.navBack();
      });
  }

  public navBack(): void {
    this._location.back();
  }

  public handleInput(fullName: string): any {
    this._debounceInput$.next(fullName);
  }

  private _debounceInputSubscribe(): void {
    this._debounceInput$
      .pipe(
        debounceTime(500),
        switchMap((name: string) => {
          return this._filterAuthors(name);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.authorsList = list.authors;
      });
  }

  private _filterAuthors(fullName: string): Observable<IListResponse> {
    const arrName = fullName.trim().toLowerCase().split(' ');
    const firstName = arrName[0];

    return this._authorsService.gets(1, 10, firstName);
  }

  private _displayFullNameAndTakeId($event: IAuthor): string {
    if ($event) {
      return this.getFullName($event);
    }

    return '';
  }

  private _loadData(): void {
    this._loadAuthors();
    this._loasGenres();
  }

  private _loadAuthors(name?: string): void {
    this._authorsService.gets(1, 100, name)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.authorsList = list.authors;
      });
  }

  private _loasGenres(): void {
    this._genresService.gets({})
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.genresList = list.genres;
      });
  }

}
