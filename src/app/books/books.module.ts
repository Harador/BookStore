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
import { BookCardComponent } from './components/components/card/card.component';
import { BooksContainer } from './components/containers/books-container/books-container.component';
import { BookDetailView } from './components/views/detail/detail.component';
import { FilterComponent } from './components/components/filter/filter.component';
import { BookCreateComponent } from './components/components/create/create.component';
import { ToCartDialogComponent } from './components/components/to-cart-dialog/to-cart-dialog.component';
import { PriceValidateDirective } from './directives/price-validate.directive';
import { AuthorValidateDirective } from './directives/author-validate.directive';
import { CountPickerComponent } from './components/components/count-picker/count-picker.component';
import { FilterGenresPipe } from './pipes/filter-genres.pipe';
import { FilterDialogContainer } from './components/containers/filter-dialog-container/filter-container.component';
import { CreateViewComponent } from './components/views/create-view/create-view.component';
import { BooksViewComponent } from './components/views/books-view/books-view.component';
import { FilterButtonComponent } from './components/components/filter-button/filter-button.component';

@NgModule({
  declarations: [
    BookCardComponent,
    BooksContainer,
    BookDetailView,
    FilterComponent,
    BookCreateComponent,
    ToCartDialogComponent,
    PriceValidateDirective,
    AuthorValidateDirective,
    CountPickerComponent,
    FilterGenresPipe,
    FilterDialogContainer,
    CreateViewComponent,
    BooksViewComponent,
    FilterButtonComponent,
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
