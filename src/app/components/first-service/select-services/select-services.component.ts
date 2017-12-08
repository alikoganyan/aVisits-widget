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

  sequence: string[];
  subSequence: Subscription;
  index: number;

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
    this.getSubscriptions();
    this.switcherService.changeCount(this.index);
  }


  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
  }

  goNext() {
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
    console.log(this.index + 1);

  }

  onClose() {
    this.interrapt = true;
  }

  getSubscriptions() {
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
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

interface Service {
  title: string;
}

interface GroupsServices {
  title: string;
}
