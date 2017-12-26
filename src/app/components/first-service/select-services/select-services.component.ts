import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {CityService} from '../../../services/city.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../../services/sidebar-switcher.service';
import {GetServicesService} from '../../../services/get-services.service';
import {Styling} from '../../../services/styling';
import * as moment from 'moment';
import {SVariables} from '../../../services/sVariables';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.component.html'
})
export class SelectServicesComponent implements OnInit, OnDestroy {

  searchText = '';

  interrapt = false;
  subInterrupt: Subscription;

  services_cat = [];
  selected_service_cat;
  selectedServices: {} = {};

  showservicesFormobile = 'hide';

  priceAndCount = {
    totalCount: 0,
    totalPrice: '0',
    totalPrices: {
      minPrice: 0,
      maxPrice: 0
    }
  };

  sequence: string[];
  subSequence: Subscription;
  index: number;

  color = Styling.color;
  searchInput = false;

  minPrice: number = 0;
  maxPrice: number = 0;
  default_duration: number = 0;

  hover_service_cat: any;

  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService,
              private getServicesService: GetServicesService) {
  }

  getAllServices() {
    this.getServicesService.getAllServices().subscribe(response => {
      console.log(response);
        if (response['data'].constructor !== Array) {
          this.services_cat = response['data'].categories;
          this.selected_service_cat = this.services_cat[0];
          response['data'].categories.map(value => {
            value.groups.map(group => {
              group.services.map(service => {
                if (service.min_max_prices === null) {
                  service.min_max_prices.min_price = 'Цена';
                  service.min_max_prices.max_price = 'не указана';
                }
                service.min_max_prices.min_price = +parseInt(service.min_max_prices.min_price, 10).toFixed();
                const hour = Math.floor(service.default_duration / 60);
                const min = service.default_duration % 60;
                service.hour = hour;
                service.min = min;
              });
            });
          });
        }
      },
      error => console.log("Something went wrong!"));
  }

  onSelectServiceCat(service_cat) {
    this.selected_service_cat = service_cat;
    this.showservicesFormobile = 'show';
  }

  onSelectService(service, event, categoryId: number) {
    service.checked = event.target.checked;
    if (event.target.checked) {
      if (this.selectedServices[categoryId] === undefined) {
        this.minPrice = 0;
        this.maxPrice = 0;
        this.default_duration = 0;
        this.selectedServices[categoryId] = {
          'services': [],
          'servicesTitles': [],
          'minPrice': null,
          'maxPrice' : null,
          "default_duration": null,
          "employeeServices": []
        };
      }
      this.services_cat.map((category) => {
        if (category.id === categoryId) {
          category.groups.map((group) => {
            group.services.map(s => {
              if (s.id === service.id) {
                console.log(SVariables.salonId);
                this.selectedServices[categoryId].services.push(s.id);
                this.selectedServices[categoryId].employeeServices.push(s);
                this.selectedServices[categoryId].servicesTitles.push(s.title);
                this.selectedServices[categoryId].minPrice = (this.minPrice += s.min_max_prices.min_price);
                this.selectedServices[categoryId].maxPrice = (this.maxPrice += s.min_max_prices.max_price);
                this.selectedServices[categoryId].default_duration = (this.default_duration += s.default_duration);
                this.selectedServices[categoryId].salon_id = SVariables.salonId;
                this.selectedServices[categoryId].date = SVariables.date;
              }
            });
          });
        }
      });

      this.priceAndCount.totalCount++;
      this.priceAndCount.totalPrices.minPrice = this.priceAndCount.totalPrices.minPrice + service.min_max_prices.min_price;
      this.priceAndCount.totalPrices.maxPrice = this.priceAndCount.totalPrices.maxPrice + service.min_max_prices.max_price;
      this.priceAndCount.totalPrice = `${this.priceAndCount.totalPrices.minPrice} - ${this.priceAndCount.totalPrices.maxPrice}`;
    } else {
      this.priceAndCount.totalCount--;
      this.priceAndCount.totalPrices.minPrice = this.priceAndCount.totalPrices.minPrice - service.min_max_prices.min_price;
      this.priceAndCount.totalPrices.maxPrice = this.priceAndCount.totalPrices.maxPrice - service.min_max_prices.max_price;
      this.priceAndCount.totalPrice = `${this.priceAndCount.totalPrices.minPrice} - ${this.priceAndCount.totalPrices.maxPrice}`;

      let checked = null;
      let objKeys = Object.keys(this.selectedServices); // 68, 83, 88

      objKeys.map(value => {
        this.selectedServices[value].services.map((sId, ind) => {
          sId === service.id && (checked = ind);
        });
        if (checked !== null) {
          this.selectedServices[value].services.splice(checked, 1);
          let index = this.selectedServices[value].servicesTitles.indexOf(service.title);
          this.selectedServices[value].servicesTitles.splice(index, 1);
          this.selectedServices[value].minPrice = this.selectedServices[value].minPrice - service.min_max_prices.min_price;
          this.selectedServices[value].maxPrice = this.selectedServices[value].maxPrice - service.min_max_prices.max_price;
          this.selectedServices[value].default_duration = this.selectedServices[value].default_duration - service.default_duration;
          checked = null;
        }
        if (this.selectedServices[value].services.length === 0) {
          delete this.selectedServices[value];
        }
      });
    }
    console.log(this.selectedServices);
  }

  goToAllServicesOnMobile() {
    this.showservicesFormobile = 'hide';
  }

  ngOnInit() {
    this.dateModify();
    this.getSubscriptions();
    this.getAllServices();
    this.navbarSwitcherService.changeCount(this.index);
  }


  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
    this.sidebarSwitcherService.getPriceAndCount({totalCount: 0, totalPrice: 0});
  }

  goNext() {
    SVariables.employeesAndTimes = Object.values(this.selectedServices);
    console.log(SVariables.employeesAndTimes);
    if (Object.values(this.selectedServices).length > 0) {
      this.sidebarSwitcherService.getPriceAndCount({totalCount: this.priceAndCount.totalCount, totalPrice: this.priceAndCount.totalPrice});
      this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
    }
  }

  onClose() {
    this.interrapt = true;
  }

  getSubscriptions() {
    this.subInterrupt = this.navbarSwitcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('s_service');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }


  dateModify() {
    const year = `${moment(new Date()).locale('ru').add(0, 'days').format('Y')}`;
    const month = `${moment(new Date()).locale('ru').add(0, 'days').format('M')}`;
    const day = `${moment(new Date()).add(0, 'days').get('date')}`;
    const date = `${year}-${month}-${day}`;
    SVariables.date = date;
  }

  /* STYLES FROM URL COLOR */

  hoverColor() {
    return Styling.globalWidgetsStyles.hoverColor;
  }

  selectStyle() {
    return Styling.globalWidgetsStyles.selectStyle;
  }

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

  checkboxStyle() {
    return Styling.globalWidgetsStyles.checkboxStyle;
  }

  ngStyleMethod(service_cat) {
    return (service_cat === this.selected_service_cat && this.hoverColor()) || (this.hover_service_cat === service_cat && this.hoverColor());
  }

  hoverStyleOn(service_cat) {
    this.hover_service_cat = service_cat;
  }

  hoverStyleOff(service_cat) {
    if (this.selected_service_cat !== service_cat) {
      this.hover_service_cat = '';
    }
  }

}

