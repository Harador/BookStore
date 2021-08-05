import { Component, OnInit, Input } from '@angular/core';

import { IBook } from '../../interfaces/book.interface';

@Component({
  selector: 'app-card-book',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {

  @Input()
  public book!: IBook;

  constructor() { }

  public ngOnInit(): void {
  }

}
