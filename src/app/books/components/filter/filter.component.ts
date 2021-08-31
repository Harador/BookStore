import {
   Component,
   OnDestroy,
   OnInit,
   Input,
   Output,
   EventEmitter,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  public model!: IFiltration;

  public readonly displayFullNameAndTakeId = this._displayFullNameAndTakeId.bind(this);

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this._initModel();
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

  private _initModel(): void {
    const params = this._activatedRoute.snapshot.queryParams;
    this.model = {
      authorId: params.authorId || '',
      genre: params.genre || '',
      maxPrice: params.maxPrice || 3000,
      minPrice: params.minPrice || 0,
    };
  }

}
