import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss'],
})
export class FormView implements OnInit {

  public isSignInSelected = false;

  constructor() { }

  public ngOnInit(): void {
  }

  public selectSignIn(): void {
    this.isSignInSelected = true;
  }

  public selectSignUp(): void {
    this.isSignInSelected = false;
  }

}
