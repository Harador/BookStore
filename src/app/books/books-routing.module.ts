import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookCreateComponent } from './components/book-create/book-create.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';

const routes: Routes = [
 { path: '', component: BooksContainerComponent },
 { path: 'detail/:id', component: BookDetailComponent },
 { path: 'create', component: BookCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
