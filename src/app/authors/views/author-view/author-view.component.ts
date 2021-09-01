import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAuthor } from '../../index';

import { IListResponse } from '@app';

@Component({
  selector: 'app-author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.scss'],
})
export class AuthorView implements OnInit {

  public author$!: Observable<IAuthor>;
  public books$!: Observable<IListResponse>;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) { }

  public ngOnInit(): void {
    this._initAuthor();
    this._initBooks();
  }

  private _initAuthor(): void {
    this.author$ = this._activatedRoute.data
    .pipe(
      map((data) => data.author$),
    );
  }

  private _initBooks(): void {
    this.books$ = this._activatedRoute.data
    .pipe(
      map((data) => data.authorBooks$),
    );
  }

}
