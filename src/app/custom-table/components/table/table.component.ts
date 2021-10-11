import { 
  Component,
  OnInit,
  Input,
  ContentChildren, 
  TemplateRef, 
  AfterViewInit, 
  QueryList, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef,
} from '@angular/core';

import { IDataConfig } from 'custom-table/interfaces/data-config.interface';
import { IMeta } from '../../interfaces/meta.interface';

import { MyCellDirective } from '../../directives/my-cell.directive';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input()
  public config!: IDataConfig;

  @ContentChildren(MyCellDirective, {read: TemplateRef}) 
  public queryList!: QueryList<MyCellDirective>;

  public data!: any;

  public meta!: IMeta;

  //массив с ссылками на шаблоны ячеек таблицы
  public templatesArray!: TemplateRef<MyCellDirective>[];

  constructor(
    private _changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._loadUsers();
  }

  ngAfterViewInit(): void {
    this.templatesArray = this.queryList.toArray() as TemplateRef<MyCellDirective>[];

    // костыль чтобы избежать ошибки "Expression has changed after it was checked"
    this._changeRef.detectChanges();
  }

  public paginatorEvent(meta: IMeta): void {
    this.meta = meta;
    this._loadUsers();
  }

  private _loadUsers(): void {
    this.config.fetch(this.meta).subscribe(
      (res) => {
        this.data = res.data
        this.meta = res.meta;
        this._changeRef.markForCheck();
      }
    );
  }

}
