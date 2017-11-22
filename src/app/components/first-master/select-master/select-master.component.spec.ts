import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectMasterComponent } from './select-master.component';

describe('SelectMasterComponent', () => {
  let component: SelectMasterComponent;
  let fixture: ComponentFixture<SelectMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
