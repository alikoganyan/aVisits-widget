import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../../services/switcher.service';
import {Master} from '../../../models/master';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-select-services-master',
  templateUrl: './select-services-master.component.html'
})
export class SelectServicesMasterComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;
  masters: Master[] = [];

  constructor(private switcherService: SwitcherService) { }

  ngOnInit() {
    this.switcherService.changeCount(4);
    this.switcherService.masters.subscribe(masters => {
      this.masters = masters;
    });
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
  }

  goBack(selectCity: string) {
    this.switcherService.onClickedStatus(selectCity);
  }

  goNext(enterContact: string) {
    this.switcherService.onClickedStatus(enterContact);
  }

  onClose(hide: string, status: string) {
    // this.switcherService.clickedStart.next(hide);
    // this.switcherService.onClickedStatus(status);
    this.interrapt = true;
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
  }

}

