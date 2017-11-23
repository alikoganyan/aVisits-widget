import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.component.html'
})
export class SelectServicesComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  services: Service[] = [
    {title: 'Парикмахерские услуги'},
    {title: 'Уход за руками'},
    {title: ' Косметология'},
    {title: ' Визаж'}
  ];
  selectedService: Service;


  groupsServices: GroupsServices[] = [
    {title: 'Стрижки'},
    {title: 'Укладки'}
  ];



  constructor(private switcherService: SwitcherService) {
  }

  onSelectService(service: Service) {
    this.selectedService = service;
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
