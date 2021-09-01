import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsContainerComponent } from './containers/authors-container/authors-container.component';
import { AuthorView } from './views/author-view/author-view.component';
import { AuthorResolver } from './resolvers/author.resolver';
import { AuthorBooksResolver } from './resolvers/author-books.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthorsContainerComponent,
  },
  {
    path: ':id',
    component: AuthorView,
    resolve: {
      author$: AuthorResolver,
      authorBooks$: AuthorBooksResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ AuthorResolver, AuthorBooksResolver, ],
})
export class AutorsRoutingModule {}
