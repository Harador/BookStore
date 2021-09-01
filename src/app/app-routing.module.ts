import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenresGuard } from './guards/genres.guard';
import { GenresResolver } from './resolvers/genres.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books' },
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
    canActivate: [ GenresGuard ],
    resolve: {
      genresObs: GenresResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ GenresGuard, GenresResolver, ],
})
export class AppRoutingModule {}
