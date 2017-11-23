import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {Salon} from '../../models/salon';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html'
})
export class SelectAddressComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  sequence;
  subSequence: Subscription;

  selectedSalon: Salon = new Salon();
  salons: Salon[] = [
    {address: 'Непокоренных, 10'},
    {address: 'Большая Зеленина, 3'},
    {address: 'Большая Зеленина, 4'},
    {address: 'Большая Зеленина, 5'},
    {address: 'Большая Зеленина, 6'},
    {address: 'Большая Зеленина, 7'},
    {address: 'Большая Зеленина, 8'},
    {address: 'Большая Зеленина, 9'}
  ];
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

  constructor(private switcherService: SwitcherService) {
  }

  ngOnInit() {
    this.switcherService.changeCount(1);
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.sequence = sequence;
    });
  }

  switchMode(event) {
    this.switcherMode = event.target.checked;
  }

  onSelectSalon(salon: any) {
    this.selectedSalon = salon;
    this.switcherService.selectAddress(salon.address);
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[0]);
  }

  goNext() {
    // this.switcherService.onClickedStatus('indicate-contacts');
    this.switcherService.onClickedStatus(this.sequence[2]);
  }

  onClose() {
    this.interrapt = true;
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
  }

}
