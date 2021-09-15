import {
   Component,
   OnDestroy,
   OnInit,
   Input,
   Output,
   EventEmitter,
   ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  FormArray,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';

import { IAuthor } from '@authors';
import { IGenre } from '@genres';

import { IBook, moreAndLess } from '../../index';

import { IListResponse, IQueriesParams } from '@app';


@Component({
  selector: 'app-book-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCreateComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

  @Input() public authors$!: Observable<IListResponse>;

  @Input() public getGenresList$!:
   (genreName?: string) => Observable<IGenre[]>;

  @Output() public readonly sortAuthors = new EventEmitter<string>();
  @Output() public readonly createBook = new EventEmitter<IBook>();


  public readonly displayFullNameAndTakeId = this._displayFullNameAndTakeId.bind(this);

  constructor(
    private readonly _location: Location,
    private readonly _fb: FormBuilder,
  ) { }

  public get genres(): FormArray {
    return this.form?.get('genres') as FormArray;
  }

  public get releaseCtrl(): AbstractControl | null {
    return this.form?.get('releaseDate');
  }

  public get writingCtrl(): AbstractControl | null {
    return this.form?.get('writingDate');
  }

  public get isAddGenreDisabled(): boolean {
    const value = this.genres.value;

    return !(value[value.length - 1]);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnDestroy(): void {
  }

  public initForm(): void {
    this.form = this._fb.group({
      title: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(100)]],
      author: [null, Validators.required],
      genres: [null, Validators.required],
      description: [null, Validators.minLength(10)],
      writingDate: [
        null,
        [
          Validators.required,
          moreAndLess(() => this.releaseCtrl),
        ],
      ],
      releaseDate: [
        null,
        [
          Validators.required,
          moreAndLess(() => this.writingCtrl, true),
        ],
      ],
    });
  }

  public deleteGenreSelect(index: number): void {
    this.genres.removeAt(index);
  }

  public addGenreCtrl(): void {
    this.genres.push(this._fb.control(
      null,
      Validators.required,
    ));
  }

  public submit(): void {
    const book: IBook = this.form.value;
    book.authorId = book.author?.id || 0;
    this.createBook.emit(book);
    this.navBack();
  }

  public navBack(): void {
    this._location.back();
  }

  public handleInput(fullName: string): any {
    this.sortAuthors.emit(fullName);
  }

  private _displayFullNameAndTakeId(author: IAuthor): string {
    if (author) {
      return `${author.firstName} ${author.lastName}`;
    }

    return '';
  }

}
