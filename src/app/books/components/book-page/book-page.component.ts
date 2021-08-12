import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '../../interfaces/book.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit, OnDestroy {

  public book!: IBook;

  private readonly destroy$
   = new Subject<void>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookService: BooksService,
  ) { }

  public ngOnInit(): void {
    this._getBook();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _getBook(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.bookService.get(id)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (book) => this.book = book,
      );
  }

}
