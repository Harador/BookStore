import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';

import { BookComponent } from './components/book/book.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';

@NgModule({
  declarations: [BookComponent, BooksContainerComponent],
  imports: [CommonModule, BookRoutingModule],
})
export class BookModule {}
