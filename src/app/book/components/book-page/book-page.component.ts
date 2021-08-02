import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit, OnDestroy {

  public book?: IBook;

  private readonly ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly bookService: BookService,
    private readonly activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.getBook();
  }
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public getBook(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.bookService.getBookById(id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((book) => this.book = book);
  }

}
