import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageView implements OnInit {

  public isNavbarShow: boolean = false;

  constructor() {}

  public ngOnInit(): void {
  }

  public toggleNavbar(): void {
    this.isNavbarShow = !this.isNavbarShow;
  }

}
