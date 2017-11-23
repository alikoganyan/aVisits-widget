import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-interrupt-record',
  templateUrl: './interrupt-record.component.html',
  styleUrls: ['./interrupt-record.component.scss']
})
export class InterruptRecordComponent implements OnInit, OnDestroy {

  status: string;
  subStatus: Subscription;

  constructor(private switcherService: SwitcherService) {}

  ngOnInit() {
    this.subStatus = this.switcherService.status.subscribe((status: string) => {
      console.log(status);
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
    this.switcherService.clickedStatus.next(status);
  }

  onClose() {
    this.switcherService.changeInterruptStatus(false);
  }

  ngOnDestroy() {
    this.subStatus.unsubscribe();
  }
}
