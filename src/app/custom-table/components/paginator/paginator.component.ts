import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IMeta } from '../../interfaces/meta.interface';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {
  @Input() public meta!: IMeta;

  @Output() public pageEvent = new EventEmitter<IMeta>();

  constructor() { }


  public get isIncrementDisabled(): boolean {
    return this.meta 
      && this.meta.page === this.meta.pages;
  }

  public get isDecreaseDisabled(): boolean {
    return this.meta 
      &&  this.meta.page === 1
  }

  ngOnInit(): void {
  }

  turnPage(i: 1 | -1): void {
    this.meta.page += i;
    this.pageEvent.emit(this.meta);
  }

  toStart(): void {
    this.meta.page = 1;
    this.pageEvent.emit(this.meta);
  }

  toEnd(): void {
    this.meta.page = this.meta.pages;
    this.pageEvent.emit(this.meta);
  }

  changeLimit(limit: string): void {
    this.meta.limit = +limit;
    this.meta.page = 1;
    this.pageEvent.emit(this.meta);
  }

}
