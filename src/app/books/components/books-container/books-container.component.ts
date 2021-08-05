import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

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

  constructor(
    private readonly bookService: BookService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    const page = this.activatedRoute.snapshot.params.page;

    this.bookService.gets(page)
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

  public handlePage(event: PageEvent): void {
    const page: number = event.pageIndex + 1;
    this._getList(page);
    this.router.navigate(['books/'+page]);
  }

  private _getList(page: number = 1): void{
    this.bookService.gets(page)
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
}
