import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorsService, IAuthor } from '../../../authors';
import { GenresService, IGenre } from '../../../genres';

@Component({
  selector: 'app-book-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class BookCreateComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

  public authors!: IAuthor[];
  public genres!: IGenre[];

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _location: Location,
    private readonly _fb: FormBuilder,
    private readonly _authorsService: AuthorsService,
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
      price: [null, [Validators.required, Validators.min(100)]],
      author: [null, Validators.required],
      genresCtrls: this._fb.array([
        this._fb.control(null, Validators.required),
      ]),
      description: ['', Validators.minLength(10)],
      writingDate: [null, Validators.required],
      releaseDate: [null, Validators.required],
    });
  }

  public deleteGenreSelect(index: number): void {
    this.genresCtrls.removeAt(index);
  }

  public addGenreCtrl(): void {
    this.genresCtrls.push(this._fb.control('', Validators.required));
  }

  public submit(): void {
    console.log(this.form.value);
  }

  public navBack(): void {
    this._location.back();
  }

  private _loadData(): void {
    this._loadAuthors();
    this._genresService.gets(1, 100)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.genres = list.genres;
      });
  }

  private _loadAuthors(name?: string): void {
    this._authorsService.gets(1, 100, name)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.authors = list.authors;
      });
  }

}
