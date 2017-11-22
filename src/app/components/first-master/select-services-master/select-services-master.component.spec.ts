import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectServicesMasterComponent } from './select-services-master.component';

describe('SelectServicesMasterComponent', () => {
  let component: SelectServicesMasterComponent;
  let fixture: ComponentFixture<SelectServicesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectServicesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectServicesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
