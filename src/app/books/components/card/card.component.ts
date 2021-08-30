import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { IBook } from '../../interfaces/book.interface';
import { ToCartDialogComponent } from '../to-cart-dialog/to-cart-dialog.component';

@Component({
  selector: 'app-card-book',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
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
