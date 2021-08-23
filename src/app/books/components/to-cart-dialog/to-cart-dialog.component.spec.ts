import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToCartDialogComponent } from './to-cart-dialog.component';

describe('ToCartDialogComponent', () => {
  let component: ToCartDialogComponent;
  let fixture: ComponentFixture<ToCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToCartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
