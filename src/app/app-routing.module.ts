import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutorsComponent } from './autor/components/autors/autors.component';
import { BookComponent } from './book/components/book/book.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/books' },
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'autors',
    loadChildren: () =>
      import('./autor/autor.module').then((m) => m.AutorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
