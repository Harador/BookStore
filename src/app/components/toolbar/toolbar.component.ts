import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  @Output()
  public readonly toggleNavbar = new EventEmitter();

  constructor(
    private readonly _router: Router,
  ) {}

  public ngOnInit(): void {}

  public navToCreateBook(): void {
    this._router.navigate(['/books/create']);
  }
}
