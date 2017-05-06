import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritySnackComponent } from './priority-snack.component';

describe('PrioritySnackComponent', () => {
  let component: PrioritySnackComponent;
  let fixture: ComponentFixture<PrioritySnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritySnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritySnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
