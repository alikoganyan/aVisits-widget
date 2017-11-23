import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.component.html',
  styleUrls: ['./select-services.component.scss']
})
export class SelectServicesComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  constructor(private switcherService: SwitcherService) { }

  ngOnInit() {
    this.switcherService.changeCount(3);
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
