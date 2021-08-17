import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorService, IAuthor } from '../../../authors';
import { GenresService, IGenre } from '../../../genres';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

  public authors!: IAuthor[];
  public genres!: IGenre[];

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _location: Location,
    private readonly _fb: FormBuilder,
    private readonly _authorsService: AuthorService,
    private readonly _genresService: GenresService,
  ) { }

  public get genresCtrls(): FormArray {
    return this.form.get('genresCtrls') as FormArray;
  }

  public ngOnInit(): void {
    this.initForm();
    this._loadData();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public initForm(): void {
    this.form = this._fb.group({
      title: ['', Validators.required],
      price: [],
      author: [],
      genresCtrls: this._fb.array([
        this._fb.control(''),
      ]),
      description: [],
      writingDate: [],
      releaseDate: [],
    });
  }

  public deleteGenreSelect(index: number): void {
    this.genresCtrls.removeAt(index);
  }

  public addGenreCtrl(): void {
    this.genresCtrls.push(this._fb.control(''));
  }

  public submit(): void {
    console.log(this.form.value);
  }

  public navBack(): void {
    this._location.back();
  }

  private _loadData(): void {
    this._authorsService.gets(1, 100)
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
