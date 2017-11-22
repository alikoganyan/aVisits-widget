import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDateTimeComponent } from './select-date-time.component';

describe('SelectDateTimeComponent', () => {
  let component: SelectDateTimeComponent;
  let fixture: ComponentFixture<SelectDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
