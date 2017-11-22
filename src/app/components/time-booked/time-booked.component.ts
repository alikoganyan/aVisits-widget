import { Component, OnInit } from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';

@Component({
  selector: 'app-time-booked',
  templateUrl: './time-booked.component.html',
  styleUrls: ['./time-booked.component.scss']
})
export class TimeBookedComponent implements OnInit {

  constructor(private switcherService: SwitcherService) { }

  ngOnInit() {
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
