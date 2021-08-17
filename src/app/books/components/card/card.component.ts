import { Component, OnInit, Input } from '@angular/core';

import { IBook } from '../../interfaces/book.interface';

@Component({
  selector: 'app-card-book',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class BookCardComponent implements OnInit {

  @Input()
  public book!: IBook;

  constructor() { }

  public ngOnInit(): void {
  }

}
