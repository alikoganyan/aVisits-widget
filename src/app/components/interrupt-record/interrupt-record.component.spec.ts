import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterruptRecordComponent } from './interrupt-record.component';

describe('InterruptRecordComponent', () => {
  let component: InterruptRecordComponent;
  let fixture: ComponentFixture<InterruptRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterruptRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterruptRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
