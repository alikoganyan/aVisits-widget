import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {CityService} from '../../../services/city.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../../services/sidebar-switcher.service';

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
    totalPrice: 0
  };

  sequence: string[];
  subSequence: Subscription;
  index: number;

  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService) {
  }

  getAllServices() {
    this.cityService.getAllServices().subscribe(response => {
      this.services_cat = response.data.categories;
      this.selected_service_cat = this.services_cat[0];
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
      this.priceAndCount.totalPrice = this.priceAndCount.totalPrice + service.price;
    } else {
      this.priceAndCount.totalCount--;
      this.priceAndCount.totalPrice = this.priceAndCount.totalPrice - service.price;
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
    this.sidebarSwitcherService.getPriceAndCount(this.priceAndCount);
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

// interface Service {
//   title: string;
// }
//
// interface GroupsServices {
//   title: string;
// }
