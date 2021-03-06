import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  @Input() public isUserLogged = false;

  @Output()
  public readonly toggleNavbar = new EventEmitter();

  @Output()
  public readonly logOut = new EventEmitter();

  constructor(
    private readonly _router: Router,
  ) {}

  public ngOnInit(): void {}

  public navToCreateBook(): void {
    this._router.navigate(['/books/create']);
  }

  public navToAuth(): void {
    this._router.navigate(['/auth']);
  }

  public handleLogOut(): void {
    this.logOut.emit();
  }

}
