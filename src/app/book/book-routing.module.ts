import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookPageComponent } from './components/book-page/book-page.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';

const routes: Routes = [{ path: '', component: BooksContainerComponent },
 { path: 'detail/:id', component: BookPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
