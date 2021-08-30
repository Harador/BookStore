import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';

import { IListResponse, IPageParams } from '../../../index';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {

  @Input()
  public books$!: Observable<IListResponse>;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
  }

  public openAddToCartDialog(event: Event): void {}
  public openFilterDialog(): void {}

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
  }

}
