import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresListComponent } from './components/genres/list.component';
import { GenresContainer } from './containers/genres-container/genres-container.component';

@NgModule({
  declarations: [
    GenresListComponent,
    GenresContainer,
  ],
  imports: [
    CommonModule,
    GenresRoutingModule,
    MatPaginatorModule,
  ],
})
export class GenresModule { }
