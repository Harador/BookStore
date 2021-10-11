import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IListResponse, IMeta } from '@app';
import { AuthorsService } from '@authors';
import { IDataResponse } from 'custom-table/interfaces/data.interface';


@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss']
})
export class TableContainerComponent implements OnInit {

  public config = {
    fetch: (params?: IMeta): Observable<IDataResponse> => {
      return this._authorService.gets(params).pipe(
        map((res) => {
          return { data: res.authors, meta: res.meta }
        })
      )
      
    }
  }

  constructor(
    private _authorService: AuthorsService,
  ) { }

  ngOnInit(): void {
  }

}
