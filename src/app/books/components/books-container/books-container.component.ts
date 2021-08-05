import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '../../interfaces/book.interface';
import { IMeta } from '../../../index';
import { BookService } from '../../services/books.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss'],
})
export class BooksContainerComponent implements OnInit, OnDestroy {

  public books: IBook[] = [];
  public meta: IMeta = {
    pages: 0,
    page: 0,
    records: 0,
    limit: 0,
  };
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly bookService: BookService) { }

  public ngOnInit(): void {
    this.bookService.gets()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (list) => {
          this.meta = list.meta;
          this.books = list.books;
        },
      );
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
