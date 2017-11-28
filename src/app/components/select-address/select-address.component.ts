import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {Salon} from '../../models/salon';
import {CityService} from '../../services/city.service';


@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html'
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
  markers: any = [
    {
      lat: 55.732,
      lng: 37.552
    },
    {
      lat: 55.734,
      lng: 37.556
    },
    {
      lat: 55.736,
      lng: 37.59
    }
  ];

  lat = 55.73;
  lng = 37.53;
  zoom = 11;

  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }


  getSalons() {
    this.cityService.getSalons().subscribe(response => {
      this.loader = false;
      console.log(response.data.salons);
      this.salons = response.data.salons;
    });
  }


  ngOnInit() {
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('select_address');
      this.sequence = sequence;
    });
    this.switcherService.changeCount(this.index);
    this.getSalons();
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

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }

}
