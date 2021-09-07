import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresAutocompComponent } from './genres-autocomp.component';

describe('GenresAutocompComponent', () => {
  let component: GenresAutocompComponent;
  let fixture: ComponentFixture<GenresAutocompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresAutocompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresAutocompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
