import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app-component/app.component';


@NgModule({
  declarations: [AppComponent, ],
  imports: [AppRoutingModule, CoreModule, LayoutModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
