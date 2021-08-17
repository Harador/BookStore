import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookCreateComponent } from './components/create/create.component';
import { BookDetailComponent } from './components/detail/detail.component';
import { BooksContainerComponent } from './components/container/container.component';

const routes: Routes = [
 { path: '', component: BooksContainerComponent },
 { path: 'detail/:id', component: BookDetailComponent },
 { path: 'create', component: BookCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
