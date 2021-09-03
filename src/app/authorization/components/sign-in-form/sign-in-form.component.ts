import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IUser } from '../../interfaces/user.interface';
import { signInValidator } from '../../validators/sign-in.validator';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent implements OnInit {

  @Output() public readonly signIn = new EventEmitter<IUser>();

  public form = this._fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  }, { validators: signInValidator(), updateOn: 'blur' });

  constructor(
    private readonly _fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
  }

  public submit(): void {
    this.signIn.emit(this.form.value);
  }

}
