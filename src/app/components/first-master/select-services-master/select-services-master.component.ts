import {Component, OnInit} from '@angular/core';
import {SwitcherService} from '../../../services/switcher.service';
import {Master} from '../../../models/master';

@Component({
  selector: 'app-select-services-master',
  templateUrl: './select-services-master.component.html',
  styleUrls: ['./select-services-master.component.scss']
})
export class SelectServicesMasterComponent implements OnInit {

  masters: Master[] = [];

  constructor(private switcherService: SwitcherService) { }

  ngOnInit() {
    this.switcherService.changeCount(4);
    this.switcherService.masters.subscribe(masters => {
      this.masters = masters;
      console.log(masters);
    });
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
