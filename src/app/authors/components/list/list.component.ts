import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthor } from '../../interfaces/author.interface';
import { IMeta } from '../../../index';
import { AuthorsService } from '../../services/authors.service';


@Component({
  selector: 'app-authors',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class AuthorsListComponent implements OnInit, OnDestroy {

  public authors: IAuthor[] = [];

  public meta!: IMeta;

  private readonly _destroy$
    = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authorservice: AuthorsService,
  ) { }

  public ngOnInit(): void {
    this._subscribeQueryParamsAndLoadList();
    this._initMeta();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * switch page
   * @param page query parameter
   * @param limit query parameter
   */
  public handlePage(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;

    this._changePage(page, limit);
  }


  private _changePage(page: number, limit: number): void {
    this._router.navigate(['/authors'], { queryParams: { page, limit } });
  }

  /**
   * load list
   * @param page query parameter
   * @param limit query parameter
   */
  private _loadList(page?: number, limit?: number): void {
    this._authorservice.gets(page, limit)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((list) => {
        this.authors = list.authors;
        this.meta = list.meta;
      });
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

  private _initMeta(): void {
    this.meta = {
      page: 0,
      records: 0,
      limit: 0,
    }
  }

}
