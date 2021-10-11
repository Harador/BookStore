import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { CustomTableModule } from 'custom-table/custom-table.module';


import { TableContainerComponent } from './containers/table-container/table-container.component';

@NgModule({
  declarations: [
    TableContainerComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    CustomTableModule,
  ]
})
export class TableModule { }
