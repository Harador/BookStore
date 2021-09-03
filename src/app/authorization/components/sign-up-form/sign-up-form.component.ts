import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../../interfaces/user.interface';
import { AuthValidateService } from '../../services/auth-validate.service';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {

  @Output() public readonly signUp = new EventEmitter<IUser>();

  public form: FormGroup = this._fb.group({
    login: [
      '',
      Validators.required,
    ],
    password: [
      '',
      [
        Validators.required,
        this._authValidateService.
          repeatPasswordValidator(() => this.form?.get('password')),
      ],
    ],
    repPassword: [
      '',
      [
        Validators.required,
        this._authValidateService.
          repeatPasswordValidator(() => this.form?.get('password')),
      ],
    ],
  }, {
    validators: this._authValidateService.signUpValidator(),
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authValidateService: AuthValidateService,
  ) { }

  public ngOnInit(): void {
  }

  public submit(): void {
    const value = this.form.value;
    const user = { login: value.login, password: value.password };
    this.signUp.emit(user);
  }

}
