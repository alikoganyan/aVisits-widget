import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Subscription} from 'rxjs/Subscription';
import {CityService} from '../../services/city.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html'
})
export class SelectCityComponent implements OnInit, OnDestroy {

  loader = true;

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  index: number;
  subSequence: Subscription;

  cities: string[] = [];
  selectCity: string;

  masterOrService = '';


  constructor(private switcherService: SwitcherService, private cityService: CityService) {
  }

  getCities() {
    this.cityService.getCities().subscribe((cities) => {
        this.loader = false;
        this.cities = cities.data.cities;
      },
      (error) => {
        console.log(error);
        this.loader = false;
    });
  }


  ngOnInit() {
    this.getCities();
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('select_city');
      this.sequence = sequence;
    });
  }



  onSelectCity(city: string) {
    this.cityService.city = city;
    this.selectCity = city;
    if (this.masterOrService !== '') {
      this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
      this.switcherService.changeMessage(this.masterOrService);
    }
  }

  selectMaster() {
    this.masterOrService = 'Master';
    if (this.selectCity !== undefined) {
      this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
      this.switcherService.changeMessage('Master');
    }
  }

  selectService() {
    this.masterOrService = 'Service';
    if (this.selectCity !== undefined) {
      this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
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

