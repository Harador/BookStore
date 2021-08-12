import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';

import { AutorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './components/authors/authors.component';

const material = [ MatPaginatorModule, ];

@NgModule({
  declarations: [AuthorsComponent],
  imports: [CommonModule, AutorsRoutingModule, material],
})

export class AuthorsModule { }
