import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenresContainer } from './containers/genres-container/genres-container.component';

const routes: Routes = [{ path: '', component: GenresContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenresRoutingModule {}
