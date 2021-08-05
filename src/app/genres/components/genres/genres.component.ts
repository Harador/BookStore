import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IGenre } from '../../interfaces/genre.interface';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})

export class GenresComponent implements OnInit, OnDestroy {

  public genres: IGenre[] = [];

  private readonly destroy$
  = new Subject<void>();

  constructor(private readonly genreservice: GenreService) { }

  public ngOnInit(): void {
    this.genreservice.gets()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((genres) => {
        this.genres = genres;
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
