import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IGenre } from '../../interfaces/genre.interface';
import { GenresService } from '../../services/genres.service';
import { IMeta } from '../../../';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})

export class GenresComponent implements OnInit, OnDestroy {

  public genres: IGenre[] = [];

  public meta!: IMeta;

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _genresService: GenresService,
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
   * @param event mat-paginator's switch page event
   */
  public handlePage(event: PageEvent): void {
    // new page index
    const page: number = event.pageIndex + 1;
    const limit: number = event.pageSize;
    this._changePage(page, limit);
    window.scrollTo(0, 0);
  }

  private _changePage(page: number, limit: number): void {
    this._router.navigate(['/genres'], { queryParams: { page, limit } });
  }

  /**
   * load list
   * @param page query parameter
   * @param limit query parameter
   */
  private _loadList(page: number = 1, limit: number = 10): void {
    this._genresService.gets(page, limit)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (list) => {
          this.meta = list.meta;
          this.genres = list.genres;
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

  private _initMeta(): void {
    this.meta = {
      page: 0,
      records: 0,
      limit: 0,
    };
  }

}
