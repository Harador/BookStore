import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

import { BooksRoutingModule } from './books-routing.module';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { BooksFilterComponent } from './components/books-filter/books-filter.component';
import { PriceValidateDirective } from './directives/price-validate.directive';
import { ValidateFilterService } from './services/validate-filter.service';
import { AutocomplitePipe } from './pipes/autocomplite.pipe';
import { AuthorValidateDirective } from './directives/author-validate.directive';

const material = [
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
];

@NgModule({
  declarations: [
    BookCardComponent, BooksContainerComponent,
    BookPageComponent, BooksFilterComponent,
    PriceValidateDirective, AutocomplitePipe,
    AuthorValidateDirective,
  ],
  imports: [CommonModule, BooksRoutingModule, FormsModule, material],
  providers: [ValidateFilterService, ],
})
export class BooksModule { }
