import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorRoutingModule } from './autor-routing.module';
import { AutorsComponent } from './components/autors/autors.component';

@NgModule({
  declarations: [AutorsComponent],
  imports: [CommonModule, AutorRoutingModule],
})
export class AutorModule {}
