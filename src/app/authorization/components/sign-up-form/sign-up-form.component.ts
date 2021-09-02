import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { signUpValidator } from '../../validators/sign-up.validator';
import { repeatPassword } from '../../validators/repeat-password.validator';
import { IUser } from '../../interfaces/user.interface';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  @Output() public readonly signUp = new EventEmitter<IUser>();

  public form: FormGroup = this._fb.group({
    login: ['', Validators.required],
    password: ['', [Validators.required, repeatPassword(() => this.form?.get('repPassword'))], ],
    repPassword: ['', [Validators.required, repeatPassword(() => this.form?.get('password'))], ],
  }, { validators: signUpValidator() });

  constructor(
    private readonly _fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
  }

  public submit(): void {
    const value = this.form.value;
    const user = { login: value.login, password: value.password };
    this.signUp.emit(user);
  }

}
