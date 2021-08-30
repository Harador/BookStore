import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';

import { AutorsRoutingModule } from './authors-routing.module';
import { AuthorsListComponent } from './components/list/list.component';
import { AuthorsContainerComponent } from './containers/authors-container/authors-container.component';


@NgModule({
  declarations: [
    AuthorsListComponent,
    AuthorsContainerComponent,
  ],
  imports: [
    CommonModule,
    AutorsRoutingModule,
    MatPaginatorModule,
  ],
})

export class AuthorsModule { }
