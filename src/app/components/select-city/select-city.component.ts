import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Subscription} from 'rxjs/Subscription';
import {City} from '../../models/city';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class SelectCityComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  cities: City[] = [
    {id: 1, title: 'Санкт-Петербург'},
    {id: 2, title: 'Москва'},
    {id: 3, title: 'Казань'}
  ];

  selectCity: City;
  masterOrService = '';
  selectAddress: string;


  constructor(private switcherService: SwitcherService) {
  }

  ngOnInit() {
   this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
  }

  onSelectCity(city: City) {
    this.switcherService.selectCity(city.title);
    this.selectCity = city;
    if (this.masterOrService !== '') {
      this.switcherService.onClickedStatus(this.selectAddress);
      this.switcherService.changeMessage(this.masterOrService);
    }
  }

  selectMaster(selectAddress: string, master: string) {
    this.masterOrService = master;
    this.selectAddress = selectAddress;
    if (this.selectCity !== undefined) {
      this.switcherService.onClickedStatus(selectAddress);
      this.switcherService.changeMessage(master);
    }
  }

  selectService(selectAddress: string, service: string) {
    this.masterOrService = service;
    this.selectAddress = selectAddress;
    if (this.selectCity !== undefined) {
      this.switcherService.onClickedStatus(selectAddress);
      this.switcherService.changeMessage(service);
    }
  }

  onClose(hide: string, status: string) {
    // this.switcherService.clickedStart.next(hide);
    // this.switcherService.clickedStatus.next(status);
    this.interrapt = true;
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
  }

}

