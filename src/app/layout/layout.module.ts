import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { UserService } from '@auth';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageView } from './views/page/page.component';
import { ToolbarContainer } from './containers/toolbar-container/toolbar-container.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    PageView,
    ToolbarContainer,
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
  ],
  exports: [
    PageView,
  ],
  providers: [
    UserService,
  ],
})
export class LayoutModule { }
