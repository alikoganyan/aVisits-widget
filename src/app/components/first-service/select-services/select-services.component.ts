import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {CityService} from '../../../services/city.service';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.component.html'
})
export class SelectServicesComponent implements OnInit, OnDestroy {

  searchText = '';

  interrapt = false;
  subInterrupt: Subscription;

  services_cat = [
    {
      title: 'Парикмахерские услуги',
      service_groups: [
        {
          title: 'Стрижки',
          services: [
            {title: 'Стрижка горячими ножницами', checked: false, price: 50},
            {title: 'Стрижка', checked: false, price: 50},
            {title: 'Окрашивание волос', checked: false, price: 50}
          ]
        },
        {
          title: 'Укладки',
          services: [
            {title: 'Окрашивание волос', checked: false, price: 50},
            {title: 'Стрижка', checked: false, price: 50},
            {title: 'Стрижка горячими ножницами', checked: false, price: 50}
          ]
        }
      ]
    },
    {
      title: 'Уход за руками',
      service_groups: [
        {
          title: 'Укладки',
          services: [
            {title: 'Окрашивание волос', checked: false, price: 50},
            {title: 'Стрижка горячими ножницами', checked: false, price: 50},
            {title: 'Стрижка', checked: false, price: 50}
          ]
        },
        {
          title: 'Стрижки',
          services: [
            {title: 'Стрижка', checked: false, price: 50},
            {title: 'Окрашивание волос', checked: false, price: 50},
            {title: 'Стрижка горячими ножницами', checked: false, price: 50}
          ]
        }
      ]
    },
    {title: ' Косметология'},
    {title: ' Визаж'}
  ];
  selected_service_cat;

  showservicesFormobile = 'hide';

  totalCount = 0;
  totalPrice = 0;


  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }


  onSelectServiceCat(service_cat) {
    this.selected_service_cat = service_cat;
    this.showservicesFormobile = 'show';
  }

  onSelectService(service, event) {
    service.checked = event.target.checked;
    if (event.target.checked === true) {
      this.totalCount++;
      this.totalPrice = this.totalPrice + service.price;
    } else {
      this.totalCount--;
      this.totalPrice = this.totalPrice - service.price;
    }
  }

  goToAllServicesOnMobile() {
    this.showservicesFormobile = 'hide';
  }

  ngOnInit() {
    this.switcherService.changeCount(3);
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
  }


  goBack(selectCity: string) {
    this.switcherService.onClickedStatus(selectCity);
  }

  goNext(enterContact: string) {
    this.switcherService.onClickedStatus(enterContact);
  }

  onClose() {
    this.interrapt = true;
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
  }

}

interface Service {
  title: string;
}

interface GroupsServices {
  title: string;
}
