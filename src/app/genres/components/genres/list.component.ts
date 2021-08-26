import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';

import { IListResponse, IPageParams } from '../../../index';


@Component({
  selector: 'genres-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class GenresListComponent implements OnInit, OnDestroy {

  @Input('genres') public genres$!: Observable<IListResponse>;

  @Output() public readonly switchPage = new EventEmitter<IPageParams>();

  constructor(
   private readonly _router: Router,
   private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit (): void {
  }

  public ngOnDestroy(): void {
  }

  public handlePage(event: PageEvent): void {
    const queryParams: IPageParams = {
      page: event.pageIndex + 1,
      limit: event.pageSize,
    };

    this._router.navigate([],
    { relativeTo: this._activatedRoute, queryParams, queryParamsHandling: 'merge' });

    this.switchPage.emit(queryParams);
  }

}
