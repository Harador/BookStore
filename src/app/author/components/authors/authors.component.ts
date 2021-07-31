import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthor } from '../../interfaces/author.interface';

import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  public authors: IAuthor[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private authorservice: AuthorService) { }

  public ngOnInit(): void {
    this.authorservice.authors$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((authors) => {
        this.authors = authors;
        this.authors.sort((a, b) => a.last_name > b.last_name ? 1 : -1);
      });
  }
  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
