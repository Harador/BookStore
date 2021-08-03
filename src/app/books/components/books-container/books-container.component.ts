import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '../../interfaces/book.interface';
import { BookService } from '../../services/books.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css'],
})
export class BooksContainerComponent implements OnInit, OnDestroy {

  public books: IBook[] = [];

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly bookService: BookService) { }

  public ngOnInit(): void {
    this.bookService.gets()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (books) => this.books = books,
      );
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
