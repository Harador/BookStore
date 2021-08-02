import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/books' },
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'autors',
    loadChildren: () =>
      import('./author/author.module').then((m) => m.AuthorModule),
  },
  {
    path: 'genres',
    loadChildren: () =>
      import('./genre/genre.module').then((m) => m.GenreModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
