import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateBookGuard } from '@core';

import { CreateContainer } from './containers/create-container/create-container.component';
import { BookDetailView } from './views/detail/detail.component';
import { BooksContainer } from './containers/books-container/books-container.component';


const routes: Routes = [
 { path: '', component: BooksContainer },
 { path: 'detail/:id', component: BookDetailView },
 { path: 'create', component: CreateContainer, canActivate: [CreateBookGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CreateBookGuard,
  ],
})
export class BooksRoutingModule {}
