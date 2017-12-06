import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {Salon} from '../../models/salon';
import {CityService} from '../../services/city.service';


@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styles: ['@media (max-width: 614px) { .switcherMode {display: none;}}']
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

  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }


  getSalons() {
    this.cityService.getSalons().subscribe(response => {
        this.loader = false;
        this.salons = response.data.salons;
      },
      error => { console.log(error); this.loader = false; });
  }

  getCityLatLong() {
    this.cityService.getCityLatLong().subscribe(city => {
        if (city.status === 'OK') {
          this.cityLocation = city.results[0].geometry.location;
        } else {
          console.log(city.status);
        }
      },
      error => console.log(error));
  }

  ngOnInit() {
    this.getSubscriptions();
    this.getSalons();
    this.getCityLatLong();
    this.switcherService.changeCount(this.index);
  }

  switchMode(event) {
    this.switcherMode = event.target.checked;
  }

  onSelectSalon(salon: any) {
    this.selectedSalon = salon;
    this.switcherService.selectAddress(salon.address);
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
  }

  goNext() {
    console.log(this.selectedSalon.id);
    this.cityService.salonId = this.selectedSalon.id;
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
  }

  onClose() {
    this.interrapt = true;
  }

  getSubscriptions() {
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('select_address');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }

}
