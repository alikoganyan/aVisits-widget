import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBookedComponent } from './time-booked.component';

describe('TimeBookedComponent', () => {
  let component: TimeBookedComponent;
  let fixture: ComponentFixture<TimeBookedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeBookedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
