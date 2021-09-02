import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { AuthorizationRoutingModule } from './authorization-routing-module';
import { AuthContainer } from './containers/auth-container/auth-container.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { FormView } from './views/form-view/form-view.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AuthContainer,
    SignUpFormComponent,
    SignInFormComponent,
    FormView,
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,

    MatButtonModule,
  ],
  providers: [
    UserService,
  ],
})
export class AuthorizationModule { }
