import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/books' },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'authors',
    loadChildren: () =>
      import('./authors/authors.module').then((m) => m.AuthorsModule),
  },
  {
    path: 'genres',
    loadChildren: () =>
      import('./genres/genres.module').then((m) => m.GenresModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
