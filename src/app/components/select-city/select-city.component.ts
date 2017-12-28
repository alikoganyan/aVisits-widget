import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {CityService} from '../../services/city.service';
import {NavbarSwitcherService} from '../../services/navbar-switcher.service';
import {SVariables} from '../../services/sVariables';
import {Styling} from '../../services/styling';


@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html'
})
export class SelectCityComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  subSequence: Subscription;

  cities: string[] = [];
  selectCity: string;

  masterOrService = '';
  hoverMasterORService = '';
  selectedSequence: string[];


  color = Styling.color;
  middleColor = Styling.middleColor;

  allowCheckMasterService = SVariables.allowCheckMasterService;


  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService) {
  }

  getCities() {
    this.cityService.getCities().subscribe((cities) => {

        this.cities = cities['data'].cities;
      if (this.allowCheckMasterService) {
        this.selectCity = cities['data'].cities[0];
        SVariables.city = cities['data'].cities[0];
      }
      if (this.cities.length < 2) {
        SVariables.city = cities['data'].cities[0];
        if (!this.allowCheckMasterService) {
          SVariables.sequenceNonCheckStep === 'masterStep' ? this.selectedSequence = SVariables.steps_employee : this.selectedSequence = SVariables.steps_service;
        }
        if (this.selectedSequence) {
          this.switcherService.onSequence(this.selectedSequence);
          const index = this.selectedSequence.indexOf('select_city');
          this.switcherService.onClickedStatus(this.sequence[index + 1]);
        }
      }
        console.log(this.selectCity);
      },
      error => console.log('Something went wrong!'));
  }


  onSelectCity(city: string) {
    SVariables.city = city;
    this.selectCity = city;
    if (!this.allowCheckMasterService) {
      SVariables.sequenceNonCheckStep === 'masterStep' ? this.selectedSequence = SVariables.steps_employee : this.selectedSequence = SVariables.steps_service;
    }
    if (this.selectedSequence) {
      this.switcherService.onSequence(this.selectedSequence);
      const index = this.selectedSequence.indexOf('select_city');
      this.switcherService.onClickedStatus(this.sequence[index + 1]);
    }
  }

  selectMaster() {
    this.masterOrService = 'Master';
    SVariables.masterOrService = 'Master';
    this.selectedSequence = SVariables.steps_employee;
    if (this.selectCity !== undefined) {
      const index = SVariables.steps_employee.indexOf('select_city');
      this.switcherService.onSequence(SVariables.steps_employee);
      this.switcherService.onClickedStatus(this.sequence[index + 1]);
    }
  }

  selectService() {
    this.masterOrService = 'Service';
    SVariables.masterOrService = 'Service';
    this.selectedSequence = SVariables.steps_service;
    if (this.selectCity !== undefined) {
      const index = SVariables.steps_service.indexOf('select_city');
      this.switcherService.onClickedStatus(this.sequence[index + 1]);
      this.switcherService.onSequence(SVariables.steps_service);
    }
  }

  ngOnInit() {
    this.getCities();
    this.getSubscriptions();
    console.log(this.allowCheckMasterService);
  }

  onClose() {
    this.interrapt = true;
  }

  getSubscriptions() {
    this.subInterrupt = this.navbarSwitcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }


  selectStyle() {
    return Styling.globalWidgetsStyles.selectStyle;
  }

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

  wrappedStyle() {
    return Styling.globalWidgetsStyles.wrappedStyle;
  }


  ngStyleMethod(masterOrService) {
    return (this.masterOrService === masterOrService && this.wrappedStyle()) || (this.hoverMasterORService === masterOrService && this.wrappedStyle());
  }

  hoverStyleOn(masterORService) {
    this.hoverMasterORService = masterORService;
  }

  hoverStyleOff(masterORService) {
    if (this.masterOrService !== masterORService) {
      this.hoverMasterORService = '';
    }
  }

  marginTop() {
    return (this.cities.length < 2) && {marginTop: '100px'};
  }

}


