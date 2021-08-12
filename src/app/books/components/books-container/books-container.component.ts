import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '../../interfaces/book.interface';
import { IMeta } from '../../../index';
import { BooksService } from '../../services/books.service';
import { BooksFilterComponent } from '../books-filter/books-filter.component';
import { IBooksFilterQuery } from '../../interfaces/books-query-params.interface';

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

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _bookService: BooksService,
    private readonly _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this._subscribeQueryParamsAndLoadList();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public openDialog(): void {
    const dialog = this._dialog.open(BooksFilterComponent);
    dialog.afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((filter) => {
        console.log(filter);
      });
  }

  /**
   * switch page
   * @param event mat-paginator's switch page event
   */
  public handlePage(event: PageEvent): void {
    // new page index
    const page: number = event.pageIndex + 1;
    const limit: number = event.pageSize;
    this._changePage(page, limit);
    window.scrollTo(0, 0);
  }

  private _changePage(page: number, limit: number) : void {
    this._router.navigate(['/books'], { queryParams: { page, limit } });
  }

  /**
   * load list
   * @param page query parameter
   * @param limit query parameter
   */
  private _loadList(page: number = 1, limit: number = 10): void {
    this._bookService.gets(page, limit)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (list) => {
          this.meta = list.meta;
          this.books = list.books;
        },
      );
  }

  private _subscribeQueryParamsAndLoadList(): void {
    this._activatedRoute.queryParams
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(({ page, limit }) => {
        this._loadList(page, limit);
      });
  }

}
