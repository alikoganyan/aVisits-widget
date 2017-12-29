import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {Salon} from '../../models/salon';
import {CityService} from '../../services/city.service';
import {NavbarSwitcherService} from '../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../services/sidebar-switcher.service';
import {SVariables} from '../../services/sVariables';
import {GetDataService} from '../../services/get-data.service';
import {Styling} from '../../services/styling';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styles: ['@media (max-width: 614px) {.switcherMode {visibility: hidden} .cityListOnMobile {display: none}}']
})
export class SelectAddressComponent implements OnInit, OnDestroy {

  loader = true;

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  index: number;
  subSequence: Subscription;

  selectedSalon: Salon;

  salons: Salon[] = [];
  switcherMode = false;

  cityLocation: { lat: number, lng: number } = {
    lat: 56.009657,
    lng: 37.9456611
  };
  zoom = 11;

  hoverSalon: any;

  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService,
              private getDataService: GetDataService) {
  }

  getSalons() {
    this.getDataService.getSalons().subscribe(response => {
      this.loader = false;
        console.log(response);
        this.salons = response['data'].salons;
      },
      error => {
      console.log('Something went wrong!');
      this.loader = false;
    });
  }

  getCityLatLong() {
    this.cityService.getCityLatLong().subscribe(city => {
        if (city['status'] === 'OK') {
          this.cityLocation = city['results'][0].geometry.location;
        } else {
          console.log('Something went wrong!');
        }
      },
      error => console.log('Something went wrong!'));
  }

  ngOnInit() {
    this.getSubscriptions();
    this.getSalons();
    this.getCityLatLong();
    this.navbarSwitcherService.changeCount(this.index);
  }

  switchMode(event) {
    this.switcherMode = event.target.checked;
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
  }

  goNext() {
    if (SVariables.employeesAndTimes) {
      SVariables.employeesAndTimes.map(employeesAndTime => {
        employeesAndTime.salon_id = this.selectedSalon.id;
      });
    }
    console.log(this.selectedSalon.id);
    SVariables.salonId = this.selectedSalon.id;
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
  }

  onClose() {
    this.interrapt = true;
  }

  getSubscriptions() {
    this.subInterrupt = this.navbarSwitcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('address');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }


  onSelectSalon(salon: any) {
    this.selectedSalon = salon;
    this.sidebarSwitcherService.selectAddress(salon.address);
  }

  /* STYLES FROM URL COLOR */

  fontColor() {
    return Styling.globalWidgetsStyles.fontColor;
  }

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }


  ngStyleMethod(salon) {
    return ((salon === this.selectedSalon) && Styling.globalWidgetsStyles.selectStyle) ||
      (this.hoverSalon === salon && Styling.globalWidgetsStyles.hoverColor);
  }


  hoverStyleOn(salon) {
    this.hoverSalon = salon;
  }

  hoverStyleOff(salon) {
    if (this.selectedSalon !== salon) {
      this.hoverSalon = '';
    }
  }


  urlFunction(salon) {
    if (this.hoverSalon === salon || this.selectedSalon === salon) {
      return 'assets/images/map-localization-hover.svg';
    }
    return 'assets/images/map-localization.svg';
  }

}
