import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormView } from './views/form-view/form-view.component';

const routes: Routes = [{ path: '', component: FormView }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
