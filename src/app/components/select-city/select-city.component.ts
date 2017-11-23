import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Subscription} from 'rxjs/Subscription';
import {City} from '../../models/city';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html'
})
export class SelectCityComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string;
  subSequence: Subscription;

  cities: City[] = [
    {id: 1, title: 'Санкт-Петербург'},
    {id: 2, title: 'Москва'},
    {id: 3, title: 'Казань'}
  ];

  selectCity: City;
  masterOrService = '';


  constructor(private switcherService: SwitcherService) {
  }

  ngOnInit() {
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.sequence = sequence[1];
    });
  }


  onSelectCity(city: City) {
    this.switcherService.selectCity(city.title);
    this.selectCity = city;
    if (this.masterOrService !== '') {
      this.switcherService.onClickedStatus(this.sequence);
      this.switcherService.changeMessage(this.masterOrService);
    }
  }

  selectMaster() {
    this.masterOrService = 'Master';
    if (this.selectCity !== undefined) {
      this.switcherService.onClickedStatus(this.sequence);
      this.switcherService.changeMessage('Master');
    }
  }

  selectService() {
    this.masterOrService = 'Service';
    if (this.selectCity !== undefined) {
      this.switcherService.onClickedStatus(this.sequence);
      this.switcherService.changeMessage('Service');
    }
  }

  onClose() {
    this.interrapt = true;
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }

}

