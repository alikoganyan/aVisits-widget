import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Subscription} from 'rxjs/Subscription';
import {NavbarSwitcherService} from '../../services/navbar-switcher.service';

@Component({
  selector: 'app-interrupt-record',
  templateUrl: './interrupt-record.component.html'
})
export class InterruptRecordComponent implements OnInit, OnDestroy {

  status: string;
  subStatus: Subscription;

  constructor(private switcherService: SwitcherService,
              private navbarSwitcherService: NavbarSwitcherService) {}

  ngOnInit() {
    this.subStatus = this.switcherService.status.subscribe((status: string) => {
      this.status = status;
    });
  }

  // onContinue() {
  //   console.log(this.status);
  //   this.switcherService.onClickedStatus(this.status);
  //   this.switcherService.clickedStart.next('show');
  // }

  discard(button: string, status: string) {
    this.switcherService.clickedStart.next(button);
    this.switcherService.onClickedStatus(status);
  }

  onClose() {
    this.navbarSwitcherService.changeInterruptStatus(false);
  }

  ngOnDestroy() {
    this.subStatus.unsubscribe();
  }
}
