import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IBook } from '../../index';

@Component({
  selector: 'app-to-cart-dialog',
  templateUrl: './to-cart-dialog.component.html',
  styleUrls: ['./to-cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToCartDialogComponent implements OnInit {

  public book: IBook = this.data.book;
  public testC = 1;
  public form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {book: IBook},
    private readonly _fb: FormBuilder,
    ) { }

  public ngOnInit(): void {
    this.form = this._fb.group({
      counter: [1, Validators.min(1)],
    });
  }

}
