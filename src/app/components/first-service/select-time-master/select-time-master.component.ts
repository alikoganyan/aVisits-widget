import { Component, OnInit } from '@angular/core';
import {SwitcherService} from '../../../services/switcher.service';

@Component({
  selector: 'app-select-time-master',
  templateUrl: './select-time-master.component.html',
  styleUrls: ['./select-time-master.component.scss']
})
export class SelectTimeMasterComponent implements OnInit {

  constructor(private switcherService: SwitcherService) { }

  ngOnInit() {
    this.switcherService.changeCount(4);
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
