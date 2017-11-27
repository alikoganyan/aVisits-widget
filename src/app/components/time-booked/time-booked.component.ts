import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';

@Component({
  selector: 'app-time-booked',
  templateUrl: './time-booked.component.html'
})
export class TimeBookedComponent implements OnInit, OnDestroy {


  sequence: string;
  subSequence: Subscription;

  constructor(private switcherService: SwitcherService) { }

  ngOnInit() {
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.sequence = sequence[0];
    });
  }


  goBack(selectCity: string) {
    this.switcherService.onClickedStatus(selectCity);
  }

  goNext() {
    this.switcherService.onClickedStatus(this.sequence);
    this.switcherService.selectMasters([]);
    this.switcherService.userContact({ email: '', name: '', notes: '', tel: '' });
  }

  onClose() {
    this.switcherService.clickedStart.next('button');
    this.switcherService.onClickedStatus('');
  }

  ngOnDestroy() {
    this.subSequence.unsubscribe();
  }
}

