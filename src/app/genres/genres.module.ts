import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresComponent } from './components/genres/genres.component';
import { GenreService } from './services/genre.service';

@NgModule({
  declarations: [
    GenresComponent,
  ],
  imports: [
    CommonModule, GenresRoutingModule,
  ],
  providers: [GenreService, ],
})
export class GenresModule { }
