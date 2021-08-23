import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { BooksRoutingModule } from './books-routing.module';
import { BookCardComponent } from './components/card/card.component';
import { BooksContainerComponent } from './components/container/container.component';
import { BookDetailComponent } from './components/detail/detail.component';
import { BooksFilterComponent } from './components/filter/filter.component';
import { BookCreateComponent } from './components/create/create.component';
import { ToCartDialogComponent } from './components/to-cart-dialog/to-cart-dialog.component';
import { PriceValidateDirective } from './directives/price-validate.directive';
import { AuthorValidateDirective } from './directives/author-validate.directive';
import { AutocomplitePipe } from './pipes/autocomplite.pipe';
import { CountPickerComponent } from './components/count-picker/count-picker.component';


@NgModule({
  declarations: [
    BookCardComponent,
    BooksContainerComponent,
    BookDetailComponent,
    BooksFilterComponent,
    BookCreateComponent,
    ToCartDialogComponent,
    PriceValidateDirective,
    AuthorValidateDirective,
    AutocomplitePipe,
    CountPickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,

    BooksRoutingModule,
  ],
})
export class BooksModule { }
