import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './components/table/table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MyCellDirective } from './directives/my-cell.directive';



@NgModule({
  declarations: [
    TableComponent,
    PaginatorComponent,
    MyCellDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TableComponent,
    MyCellDirective,
  ]
})
export class CustomTableModule { }
