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
import { MatChipsModule } from '@angular/material/chips';

import { BooksRoutingModule } from './books-routing.module';
import { BookCardComponent } from './components/card/card.component';
import { BooksContainer } from './containers/books-container/books-container.component';
import { BookDetailView } from './views/detail/detail.component';
import { FilterComponent } from './components/filter/filter.component';
import { BookCreateComponent } from './components/create/create.component';
import { ToCartDialogComponent } from './components/to-cart-dialog/to-cart-dialog.component';
import { PriceValidateDirective } from './directives/price-validate.directive';
import { AuthorValidateDirective } from './directives/author-validate.directive';
import { CountPickerComponent } from './components/count-picker/count-picker.component';
import { HideSelectedGenresPipe } from './pipes/hide-selected-genres.pipe';
import { FilterDialogContainer } from './containers/filter-dialog-container/filter-container.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { CreateContainer } from './containers/create-container/create-container.component';
import { GenresAutocompComponent } from './components/genres-autocomp/genres-autocomp.component';

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
    HideSelectedGenresPipe,
    FilterDialogContainer,
    BooksListComponent,
    FilterButtonComponent,
    CreateContainer,
    GenresAutocompComponent,
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
    MatChipsModule,

    BooksRoutingModule,
  ],
})
export class BooksModule { }
