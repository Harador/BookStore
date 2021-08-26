import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsContainerComponent } from './containers/authors-container/authors-container.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorsRoutingModule {}
