import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {

  @Output()
  public readonly toggleNavbar = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {}

}
