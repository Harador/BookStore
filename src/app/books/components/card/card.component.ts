import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { IBook } from '@books';

import { ToCartDialogComponent } from '../to-cart-dialog/to-cart-dialog.component';

@Component({
  selector: 'app-card-book',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent implements OnInit {

  @Input()
  public book!: IBook;

  constructor(
    private readonly _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
  }

  public openDialog(): void {
    this._dialog.open(
      ToCartDialogComponent,
      { data: { book: this.book } },
    );
  }

}
