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
  constructor(private switcherService: SwitcherService) { }

  ngOnInit() {
  this.subStatus = this.switcherService.clickedStatus.subscribe((status: string) => {
    this.status = status;
    console.log(status);
  });
  }

  onContinue() {
    this.switcherService.clickedStatus.next(this.status);
  }

  discard(button: string, status: string) {
    this.switcherService.clickedStart.next(button);
    this.switcherService.clickedStatus.next(status);
  }

  ngOnDestroy() {
    this.subStatus.unsubscribe();
  }

}
