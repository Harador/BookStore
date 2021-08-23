import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '../../interfaces/book.interface';
import { IMeta } from '../../../index';
import { IBooksFilterQuery } from '../../interfaces/books-query-params.interface';
import { BooksService } from '../../services/books.service';
import { BooksFilterComponent } from '../filter/filter.component';
import { ToCartDialogComponent } from '../to-cart-dialog/to-cart-dialog.component';



@Component({
  selector: 'app-books-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class BooksContainerComponent implements OnInit, OnDestroy {

  public books: IBook[] = [];

  public meta!: IMeta;


  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _bookService: BooksService,
  ) {
  }

  public ngOnInit(): void {
    this._subscribeQueryParamsAndLoadList();
    this._initMeta();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public openFilterDialog(): void {
    const dialog = this._dialog.open(BooksFilterComponent);
    dialog.afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((filterQuery) => {
        if (filterQuery) {
          this._changePage({ ...filterQuery });
        }
      });
  }

  public openAddToCartDialog(book: any): void {
    this._dialog.open(ToCartDialogComponent, { data: { book } });
  }

  /**
   * switch page (paginator)
   * @param event mat-paginator's switch page event
   */
  public handlePage(event: PageEvent): void {
    // new page index
    const page: number = event.pageIndex + 1;
    const limit: number = event.pageSize;
    this._changePage({ page, limit });
    window.scrollTo(0, 0);
  }

  private _changePage(queryParams: Params) : void {
    this._router.navigate([''],
      { relativeTo: this._activatedRoute,
        queryParams, queryParamsHandling: 'merge' });
  }

  /**
   * load list
   * @param page query parameter
   * @param limit query parameter
   */
  private _loadList(
    page: number = 1,
    limit: number = 10,
    filterQuery: IBooksFilterQuery,
    ): void {
    this._bookService.gets(page, limit, filterQuery)
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
      .subscribe((params) => {
        const filterQuery: IBooksFilterQuery = {
          author: params.author,
          genre: params.genre,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
        };
        this._loadList(params.page, params.limit, filterQuery);
      });
  }

  private _initMeta(): void {
    this.meta = {
      page: 0,
      records: 0,
      limit: 0,
    };
  }

}
