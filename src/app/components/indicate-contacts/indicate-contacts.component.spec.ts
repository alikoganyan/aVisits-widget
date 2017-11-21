import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateContactsComponent } from './indicate-contacts.component';

describe('IndicateContactsComponent', () => {
  let component: IndicateContactsComponent;
  let fixture: ComponentFixture<IndicateContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicateContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicateContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
