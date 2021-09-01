import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';

import { AutorsRoutingModule } from './authors-routing.module';
import { AuthorsListComponent } from './components/list/list.component';
import { AuthorsContainerComponent } from './containers/authors-container/authors-container.component';
import { AuthorView } from './views/author-view/author-view.component';


@NgModule({
  declarations: [
    AuthorsListComponent,
    AuthorsContainerComponent,
    AuthorView,
  ],
  imports: [
    CommonModule,
    AutorsRoutingModule,
    MatPaginatorModule,
  ],
})

export class AuthorsModule { }
