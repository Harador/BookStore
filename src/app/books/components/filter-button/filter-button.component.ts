import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FilterDialogContainer } from '../../index';
@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent implements OnInit {

  constructor(
    private readonly dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
  }

  public openDialog(): void {
    this.dialog.open(FilterDialogContainer);
  }

}
