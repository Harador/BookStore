import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';

import { IPageParams, IListResponse } from '../../../index';


@Component({
  selector: 'app-authors-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class AuthorsListComponent implements OnInit, OnDestroy {

  @Input('authors') public authors$!: Observable<IListResponse>;

  @Output() public readonly changePage = new EventEmitter<IPageParams>();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  public handlePage(event: PageEvent): void {
    const queryParams: IPageParams = {
      page: event.pageIndex + 1,
      limit: event.pageSize,
    };

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });

    this.changePage.emit(queryParams);
  }

}
