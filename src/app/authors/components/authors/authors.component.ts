import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthor } from '../../interfaces/author.interface';
import { AuthorService } from '../../services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit, OnDestroy {

  public authors: IAuthor[] = [];

  private readonly destroy$
   = new Subject<void>();

  constructor(
   private readonly authorservice: AuthorService,
  ) { }

  public ngOnInit(): void {
    this.authorservice.get()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((authors) => {
        this.authors = authors;
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
