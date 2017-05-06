import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSnackComponent } from './status-snack.component';

describe('NoticeSnackComponent', () => {
  let component: StatusSnackComponent;
  let fixture: ComponentFixture<StatusSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
