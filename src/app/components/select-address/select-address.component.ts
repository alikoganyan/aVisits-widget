import {Component, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Salon} from '../../models/salon';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss']
})
export class SelectAddressComponent implements OnInit {

  selectedSalon: Salon  = new Salon();
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
  }

  switchMode(event) {
    this.switcherMode = event.target.checked;
  }

  onSelectSalon(salon: any) {
    this.selectedSalon = salon;
    this.switcherService.selectAddress(salon.address);
  }

  goBack(selectCity: string) {
    this.switcherService.clickedStatus.next(selectCity);
  }

  goNext(enterContact: string) {
    this.switcherService.clickedStatus.next(enterContact);
  }

  onClose(hide: string, status: string) {
    this.switcherService.clickedStart.next(hide);
    this.switcherService.clickedStatus.next(status);
  }

}
