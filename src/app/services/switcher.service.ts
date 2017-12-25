import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';



@Injectable()
export class SwitcherService {

  clickedStart = new Subject<string>();

  private clickedStatus = new BehaviorSubject('select-city'); // status here
  status = this.clickedStatus.asObservable();

// ["select_city", "m_employee", "m_service", "address", "m_time", "indicate_contacts", "time_booked"]
  // ["address", "s_service", "s_employee_time", "indicate_contacts", "time_booked"]

  private resSequence = new BehaviorSubject([]);
  sequence = this.resSequence.asObservable();

  constructor() {
  }

  onClickedStatus(status: string) {
    this.clickedStatus.next(status);
  }

  onSequence(sequence: string[]) {
    this.resSequence.next(sequence);
  }

}

