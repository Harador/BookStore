import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorService } from './services/authors.service';

@NgModule({
  declarations: [AuthorsComponent],
  imports: [CommonModule, AutorsRoutingModule],
  providers: [AuthorService],
})
export class AuthorsModule {}
