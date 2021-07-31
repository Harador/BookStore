import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorRoutingModule } from './author-routing.module';

import { AuthorsComponent } from './components/authors/authors.component';

import { AuthorService } from './services/author.service';

@NgModule({
  declarations: [AuthorsComponent],
  imports: [CommonModule, AutorRoutingModule],
  providers: [AuthorService]
})
export class AuthorModule {}
