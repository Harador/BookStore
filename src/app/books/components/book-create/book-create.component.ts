import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorService, IAuthor } from 'src/app/authors';
import { GenresService, IGenre } from 'src/app/genres';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit, OnDestroy {

  public form = this.fb.group({
    title: ['', Validators.required],
    price: [],
    author: [],
    genresCtrls: this.fb.array([
      this.fb.control('')
    ]),
    description: [],
    writingDate: [],
    releaseDate: [],
  });

  public authors!: IAuthor[];
  public genres!: IGenre[];

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _location: Location,
    private readonly fb: FormBuilder,
    private readonly _authorsService: AuthorService,
    private readonly _genresService: GenresService,
  ) { }

  get genresCtrls(){
    return this.form.get('genresCtrls') as FormArray;
  }

  ngOnInit(): void {
    this._loadData();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public addGenreCtrl(){
    this.genresCtrls.push(this.fb.control(''))
  }

  public submit(){
    console.log(this.form.value);
  }

  public navBack(){
    this._location.back();
  }

  private _loadData(): void {
    this._authorsService.gets(1, 100)
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe((list)=>{
      this.authors = list.authors;
    });

    this._genresService.gets(1, 100)
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe((list)=>{
      this.genres = list.genres;
    });
    
  }

}
