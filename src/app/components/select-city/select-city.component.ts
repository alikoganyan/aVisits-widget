import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {CityService} from '../../services/city.service';
import {NavbarSwitcherService} from '../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../services/sidebar-switcher.service';
import {SVariables} from '../../services/sVariables';
import {HttpErrorResponse} from '@angular/common/http';
import {Styling} from '../../services/styling';


@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html'
})
export class SelectCityComponent implements OnInit, OnDestroy {

  loader = true;

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  subSequence: Subscription;

  cities: string[] = [];
  selectCity: string;

  masterOrService = '';
  selectedSequence: string[];


  color = '#EF7B4C';
  lightColor = '#EFD8C8';
  hover;


  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService) {
  }


  getCities() {
    this.cityService.getCities().subscribe((cities) => {
        this.loader = false;
        this.cities = cities['data'].cities;
      },
      (err: HttpErrorResponse) => {
        this.loader = false;
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
        }
      });
  }


  onSelectCity(city: string) {
    this.sidebarSwitcherService.selectCity(city);
    SVariables.city = city;
    this.selectCity = city;
    if (this.selectedSequence) {
      this.switcherService.onSequence(this.selectedSequence);
      const index = this.selectedSequence.indexOf('select_city');
      this.switcherService.onClickedStatus(this.sequence[index + 1]);
    }
  }

  selectMaster() {
    this.selectedSequence = SVariables.steps_employee;
    if (this.selectCity !== undefined) {
      const index = SVariables.steps_employee.indexOf('select_city');
      this.switcherService.onSequence(SVariables.steps_employee);
      this.switcherService.onClickedStatus(this.sequence[index + 1]);

    }
  }

  selectService() {
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






/* STYLES FROM URL COLOR */

  selectStyle() {
    return Styling.selectStyle;
  }

  radioStyle() {
    return Styling.radioStyle;
  }

  wrappedStyle() {
    return Styling.wrappedStyle;
  }

  changeHoverM(event) {
    if( event.type == 'mouseover') {
      this.hover = 'master';
    } else {
      if (this.masterOrService !== 'Master') {
        this.hover = false;
      }
    }
      // this.hover = event.type == 'mouseover' ? 'master' : false;
  }

  changeHoverS(event) {
    if( event.type == 'mouseover') {
      this.hover = 'service';
    } else {
      if (this.masterOrService !== 'Service') {
        this.hover = false;
      }
    }
  }



}


