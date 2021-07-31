import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '../../interfaces/book.interface';
import { IGenre } from '../../interfaces/genre.interface';

import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent implements OnInit, OnDestroy {
  public books: IBook[] = [];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private bookService: BookService) { }

  public ngOnInit(): void {
    this.bookService.books$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((books) => this.books = books);
  }
  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
