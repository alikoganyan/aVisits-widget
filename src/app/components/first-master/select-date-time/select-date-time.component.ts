import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';

@Component({
  selector: 'app-select-date-time',
  templateUrl: './select-date-time.component.html'
})
export class SelectDateTimeComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  constructor(private switcherService: SwitcherService) {
  }

  ngOnInit() {
    this.switcherService.changeCount(5);
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
