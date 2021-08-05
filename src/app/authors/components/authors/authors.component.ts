import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthor } from '../../interfaces/author.interface';
import { IMeta } from '../../../index';
import { AuthorService } from '../../services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit, OnDestroy {

  public authors: IAuthor[] = [];
  public meta: IMeta = {
    pages: 0,
    page: 0,
    records: 0,
    limit: 0,
  };

  private readonly destroy$
    = new Subject<void>();

  constructor(
    private readonly authorservice: AuthorService,
  ) { }

  public ngOnInit(): void {
    this.authorservice.gets()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((list) => {
        this.authors = list.authors;
        this.meta = list.meta;
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
