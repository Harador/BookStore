import {
   Component,
   OnDestroy,
   OnInit,
   Input,
   Output,
   EventEmitter,
} from '@angular/core';

import { IAuthor } from '@authors';
import { IGenre } from '@genres';

import { IFiltration, IQueriesParams } from '@app';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {

  @Input() public authors!: IAuthor[];
  @Input() public genres!: IGenre[];

  @Output() public readonly closeDialog = new EventEmitter<IQueriesParams>();
  @Output() public readonly sortAuthors = new EventEmitter<string>();

  public model: IFiltration = {
    authorId: '',
    genre: '',
    maxPrice: 9900,
    minPrice: 0,
  };

  public readonly displayFullNameAndTakeId = this._displayFullNameAndTakeId.bind(this);

  constructor(
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  public closeThisDialog(): void {
    this.closeDialog.emit(this.model);
  }

  public handleInput(fullName: string): any {
    this.sortAuthors.emit(fullName);
  }

  public formatLabel(value: number): string | number {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }

    return value;
  }

  private _displayFullNameAndTakeId($event: IAuthor): string {
    if ($event) {
      this.model.authorId = $event.id;

      return `${$event.firstName } ${$event.lastName }`;
    }

    return '';
  }

}
