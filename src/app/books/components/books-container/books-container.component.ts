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

  // list's books
  public books: IBook[] = [];

  // list's meta
  public meta: IMeta = {
    pages: 0,
    page: 0,
    records: 0,
    limit: 0,
  };

  // unsubscribe var
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly bookService: BookService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    /**
     * subscribe to
     * query-parameters
     * and load list
     */
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((params) => {
        this._loadList(params.page);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * switch page
   * @param event mat-paginator's switch page event
   */
  public handlePage(event: PageEvent): void {
    // new page index
    const page: number = event.pageIndex + 1;
    this._toPage(page);
    window.scrollTo(0, 0);
  }

  /**
   * switch page
   * @param page query parameter
   */
  private _toPage(page: number): void {
    this.router.navigate(['/books'], { queryParams: { page } });
  }

  /**
   * load list
   * @param page query parameter
   */
  private _loadList(page: number = 1): void {
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
