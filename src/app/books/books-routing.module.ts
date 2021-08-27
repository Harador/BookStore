import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookCreateComponent } from './components/components/create/create.component';
import { BookDetailView } from './components/views/detail/detail.component';
import { BooksContainer } from './components/containers/books-container/books-container.component';

const routes: Routes = [
 { path: '', component: BooksContainer },
 { path: 'detail/:id', component: BookDetailView },
 { path: 'create', component: BookCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
