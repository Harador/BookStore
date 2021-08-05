import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BooksRoutingModule } from './books-routing.module';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { BookService } from './services/books.service';

const material = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [BookCardComponent, BooksContainerComponent, BookPageComponent, ],
  imports: [CommonModule, BooksRoutingModule, material],
  providers: [BookService],
})
export class BooksModule { }
