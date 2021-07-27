import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorsComponent } from './components/autors/autors.component';

const routes: Routes = [
  {
    path: '',
    component: AutorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorRoutingModule {}
