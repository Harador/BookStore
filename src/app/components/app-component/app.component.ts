import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public isNavbarShow: boolean = false;

  constructor() {}

  public toggleNavbar(): void {
    this.isNavbarShow = !this.isNavbarShow;
  }

}
