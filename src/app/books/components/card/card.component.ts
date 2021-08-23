import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { IBook } from '../../interfaces/book.interface';

@Component({
  selector: 'app-card-book',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class BookCardComponent implements OnInit {

  @Input()
  public book!: IBook;
  @Output()
  public readonly openAddToCartDialog = new EventEmitter<IBook>();

  constructor() { }

  public ngOnInit(): void {
  }

  public openDialog(): void {
    this.openAddToCartDialog.emit(this.book);
  }

}
