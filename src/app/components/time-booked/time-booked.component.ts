import { Component, OnInit } from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';

@Component({
  selector: 'app-time-booked',
  templateUrl: './time-booked.component.html'
})
export class TimeBookedComponent implements OnInit {

  constructor(private switcherService: SwitcherService) { }

  ngOnInit() {
  }


  goBack(selectCity: string) {
    this.switcherService.onClickedStatus(selectCity);
  }

  goNext(enterContact: string) {
    this.switcherService.onClickedStatus(enterContact);
    this.switcherService.selectMasters([]);
    this.switcherService.userContact({ email: '', name: '', notes: '', tel: '' });
  }

  onClose(button: string, status: string) {
    this.switcherService.clickedStart.next(button);
    this.switcherService.onClickedStatus(status);
  }

}
