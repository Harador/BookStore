import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IGenre } from '../../interfaces/genre.interface';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit, OnDestroy {
  public genres: IGenre[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly genreservice: GenreService) { }

  public ngOnInit(): void {
    this.genreservice.genres$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((genres) => {
        this.genres = genres;
      });
  }
  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
