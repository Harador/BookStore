import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenresComponent } from './components/genres/genres.component';
import { GenreService } from './services/genre.service';

@NgModule({
  declarations: [
    GenresComponent,
  ],
  imports: [
    CommonModule, GenreRoutingModule,
  ],
  providers: [GenreService, ],
})
export class GenreModule { }
