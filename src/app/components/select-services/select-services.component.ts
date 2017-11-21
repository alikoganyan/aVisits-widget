import {Component, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.component.html',
  styleUrls: ['./select-services.component.scss']
})
export class SelectServicesComponent implements OnInit {

  constructor(private switcherService: SwitcherService) { }

  ngOnInit() {
    this.switcherService.changeCount(3);
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
