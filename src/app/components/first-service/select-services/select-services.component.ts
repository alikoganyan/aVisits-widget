import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {CityService} from '../../../services/city.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../../services/sidebar-switcher.service';
import {GetServicesService} from '../../../services/get-services.service';

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

  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService,
              private getServicesService: GetServicesService) {
  }

  getAllServices() {
    this.getServicesService.getAllServices().subscribe(response => {
        console.log(response['data'].categories);
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
              console.log(typeof service.min_max_prices.min_price);
              const time = service.default_duration;
              const hour = Math.floor(time / 60);
              const min = time % 60;
              service.hour = hour;
              service.min = min;
            });
          });
        });
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
        }
      });
  }

  onSelectServiceCat(service_cat) {
    this.selected_service_cat = service_cat;
    this.showservicesFormobile = 'show';
  }

  onSelectService(service, event) {
    service.checked = event.target.checked;
    if (event.target.checked === true) {
      this.priceAndCount.totalCount++;
      this.priceAndCount.totalPrices.minPrice = this.priceAndCount.totalPrices.minPrice + service.min_max_prices.min_price;
      this.priceAndCount.totalPrices.maxPrice = this.priceAndCount.totalPrices.maxPrice + service.min_max_prices.max_price;
      this.priceAndCount.totalPrice = `${this.priceAndCount.totalPrices.minPrice} - ${this.priceAndCount.totalPrices.maxPrice}`;
    } else {
      this.priceAndCount.totalCount--;
      this.priceAndCount.totalPrices.minPrice = this.priceAndCount.totalPrices.minPrice - service.min_max_prices.min_price;
      this.priceAndCount.totalPrices.maxPrice = this.priceAndCount.totalPrices.maxPrice - service.min_max_prices.max_price;
      this.priceAndCount.totalPrice = `${this.priceAndCount.totalPrices.minPrice} - ${this.priceAndCount.totalPrices.maxPrice}`;
    }
  }

  goToAllServicesOnMobile() {
    this.showservicesFormobile = 'hide';
  }

  ngOnInit() {
    this.getSubscriptions();
    this.getAllServices();
    this.navbarSwitcherService.changeCount(this.index);
  }


  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
    this.sidebarSwitcherService.getPriceAndCount({totalCount: 0, totalPrice: 0});
    console.log(this.priceAndCount);
  }

  goNext() {
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
    this.sidebarSwitcherService.getPriceAndCount({totalCount: this.priceAndCount.totalCount, totalPrice: this.priceAndCount.totalPrice});
    console.log(this.priceAndCount);
  }

  onClose() {
    this.interrapt = true;
  }

  getSubscriptions() {
    this.subInterrupt = this.navbarSwitcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('select_services');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }

}

