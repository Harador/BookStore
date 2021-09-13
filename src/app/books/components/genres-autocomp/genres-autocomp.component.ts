import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
 } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { debounceTime, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { IGenre } from '@genres';

@Component({
  selector: 'app-genres-autocomp',
  templateUrl: './genres-autocomp.component.html',
  styleUrls: ['./genres-autocomp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GenresAutocompComponent,
    },
  ],
})
export class GenresAutocompComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() public getGenresList$!:
   (genreName?: string) => Observable<IGenre[]>;

  public genresData$!: Observable<IGenre[]>;

  public setNewGenresObservable$ = new Subject<string>();

  public genresControl = new FormControl('');

  public touched = false;

  private _value: IGenre[] = [];

  private readonly _destroy$ = new Subject();

  constructor() { }

  public get value(): IGenre[] {
    return this._value;
  }

  public set value(value: IGenre[]) {
    this._value = value;

    this.onChange(this.value);
    this.markAsTouched();
  }

  public ngOnInit(): void {
    this._initGenresObservable();
    this._subscribeGenreControl();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onChange = (val: any) => {};

  public onTouched = () => {};

  public writeValue(val: IGenre[]): void {
    this.value = val;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public deleteGenre(genre: IGenre): void {
    const id = this.value.findIndex((item) => {
      return item.id === genre.id;
    });

    this.value.splice(id, 1);
  }

  private _subscribeGenreControl(): void {
    this.genresControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((value) => {
        if (typeof value !== 'string') {
          this._addChipAndPushValue(value);
          this.genresControl.patchValue('');
        } else {
          this.setNewGenresObservable$.next(value);
        }
      });
  }

  private _addChipAndPushValue(genre: IGenre): void {
    const isSelected = this.value.some((item) => {
      return item.id === genre.id;
    });

    if (!isSelected) {
      this.value.push(genre);
    }
  }

  private _initGenresObservable(): void {
    this.genresData$ = this.setNewGenresObservable$.asObservable()
    .pipe(
      startWith(''),
      debounceTime(300),
      switchMap((name: string) => this.getGenresList$(name)),
    );
  }

}
