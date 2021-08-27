import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { AuthorsService } from '../../../../authors';
import { GenresService } from '../../../../genres';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
})
export class FilterDialogContainer implements OnInit {

  constructor(
    private readonly _dialogRef: MatDialogRef<FilterDialogContainer>,
    private readonly _authorService: AuthorsService,
    private readonly _genresService: GenresService,
  ) { }

  public ngOnInit(): void {
  }

  public closeDialog(): void {
    this._dialogRef.close();
  }

}
