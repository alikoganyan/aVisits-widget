import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTimeMasterComponent } from './select-time-master.component';

describe('SelectTimeMasterComponent', () => {
  let component: SelectTimeMasterComponent;
  let fixture: ComponentFixture<SelectTimeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTimeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTimeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
