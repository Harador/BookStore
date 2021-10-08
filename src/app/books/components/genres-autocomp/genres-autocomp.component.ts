import {
   Component,
   OnInit,
   ChangeDetectionStrategy,
   Input,
   OnDestroy,
   HostBinding,
   Self,
   ElementRef,
} from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NgControl,
 } from '@angular/forms';

import { MatFormFieldControl } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { Observable, Subject } from 'rxjs';
import { debounceTime, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { IGenre } from '@genres';

@Component({
  selector: 'app-genres-autocomp',
  templateUrl: './genres-autocomp.component.html',
  styleUrls: ['./genres-autocomp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl,
      useExisting: GenresAutocompComponent,
    },
  ],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class GenresAutocompComponent implements OnInit, OnDestroy,
 MatFormFieldControl<IGenre[]>, ControlValueAccessor {

  public static nextId = 0;

  @Input() public getGenresList$!:
    (genreName?: string) => Observable<IGenre[]>;

  @Input()
    public get required(): boolean {
      return this._required;
    }

  public set required(req: boolean) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
    public get placeholder(): string {
      return this._placeholder;
    }

  public set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  public genresData$!: Observable<IGenre[]>;

  public setNewGenresObservable$ = new Subject<string>();

  public genresControl = new FormControl('');

  public id = `app-genres-autocomp-${GenresAutocompComponent.nextId++}`;

  public touched = false;

  public stateChanges = new Subject<void>();

  public focused = false;

  public disabled = false;

  public controlType = 'custom-genres-autocomplete';

  private _value!: IGenre[] | null;

  private _placeholder!: string;

  private _required = false;

  private readonly _destroy$ = new Subject();

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    @Self() public ngControl: NgControl,
  ) {
    this.ngControl.valueAccessor = this;
  }

  public get empty(): boolean {
    return !this.value && !this.genresControl.value;
  }

  public get value(): IGenre[] | null {
    return this._value;
  }

  public set value(value: IGenre[] | null) {
    this._value = value;

    this.onChange(this.value);
  }

  public get errorState(): boolean {
    return this.touched && !this.value;
  }

  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  public ngOnInit(): void {
    this._initGenresObservable();
    this._subscribeGenreControl();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this.stateChanges.complete();
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

  public onFocusIn(event: FocusEvent): void {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  public onFocusOut(event: FocusEvent): void {
    this.touched = true;
    this.focused = false;
    this.onTouched();
    this.stateChanges.next();
  }

  public setDescribedByIds(ids: string[]): void {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.genre-autocomplete');

    if (controlElement) {
      controlElement.setAttribute('aria-describedby', ids.join(' '));
    }
  }

  public onContainerClick(event: MouseEvent): void {
    //this._elementRef.nativeElement.querySelector('input')?.focus();
  }

  public deleteGenre(genre: IGenre): void {
    if (this.value) {
      const index = this.value.findIndex((item) => {
        return item.id === genre.id;
      });

      const newValue = this.value.slice();
      newValue.splice(index, 1);

      this.value = newValue.length > 0 ? newValue : null;
    }
    this.markAsTouched();
  }

  private _addChipAndPushValue(genre: IGenre): void {
    if (!this.value) {
      this.value = [genre];
    } else {
      const newValue = this.value.slice();
      newValue.push(genre);

      this.value = newValue;
    }
    this.markAsTouched();
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

  private _initGenresObservable(): void {
    this.genresData$ = this.setNewGenresObservable$
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap((name: string) => this.getGenresList$(name)),
      );
  }

}
