import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,
         NG_VALIDATORS, Validator, AbstractControl,
         ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-count-picker',
  templateUrl: './count-picker.component.html',
  styleUrls: ['./count-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CountPickerComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CountPickerComponent,
    },
  ],
})
export class CountPickerComponent implements OnInit, ControlValueAccessor, Validator {

  @Input()
  public increment = 1;

  @Input()
  public min?: string;

  @Input()
  public max?: string;

  public touched = false;

  private _value = 1;

  constructor() { }

  public get value(): number {
    return this._value;
  }

  public set value(val: number) {
    this._value = val;

    this.onChange(this.value);
    this.markAsTouched();
  }

  public ngOnInit(): void {
  }

  public onAdd(): void {
    this.value += this.increment;
  }

  public onRemove(): void {
    this.value -= this.increment;
  }

  public onInput(input: any): void {
    const value = parseInt(input.value, 10);

    if (isNaN(value) || value === 0) {
      this.value = 0;
      input.value = 0;
    } else {
      this.value = value;
    }

    this.onChange(this.value);
    this.markAsTouched();
  }

  public writeValue(value: number): void {
    this.value = value;
  }

  public onChange = (value : number) => {};

  public onTouched = () => {};

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  public markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const count = control.value;

    if (this.min && count < +this.min) {
      return {
        lessThenMin: +this.min,
      };
    }
    if (this.max && count > +this.max) {
      return {
        moreThenMax: +this.max,
      };
    }

    return null;
  }

}
