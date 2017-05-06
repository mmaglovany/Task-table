import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeCreateEditComponent } from './notice-create-edit.component';

describe('NoticeCreateEditComponent', () => {
  let component: NoticeCreateEditComponent;
  let fixture: ComponentFixture<NoticeCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
