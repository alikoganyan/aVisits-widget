import {Component, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';

@Component({
  selector: 'app-select-services-master',
  templateUrl: './select-services-master.component.html',
  styleUrls: ['./select-services-master.component.scss']
})
export class SelectServicesMasterComponent implements OnInit {

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
