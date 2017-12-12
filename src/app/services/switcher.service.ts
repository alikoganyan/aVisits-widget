import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SwitcherService {

  clickedStart = new Subject<string>();

  private clickedStatus = new BehaviorSubject('select-city'); // status here
  status = this.clickedStatus.asObservable();

  private messageSource = new BehaviorSubject('default message');  // Master or Service first
  currentMessage = this.messageSource.asObservable();


  // sequence = [
  //   'select-address',
  //   'indicate-contacts',
  //   'select-master',
  //   'select-services-master',
  //   'select-date-time'
  // ];

  private resSequence = new BehaviorSubject([
    'select_city',
    'select_address',
    'indicate_contacts',
    'select_master',
    'select_services_master',
    'select_date_time',
    'time_booked'
  ]);

/*  private resSequence = new BehaviorSubject([
    'select_city',
    'select_address',
    'indicate_contacts',
    'select_services',
    'select_time_master',
    'time_booked'
  ]);*/
  sequence = this.resSequence.asObservable();


  constructor() {
  }

  onClickedStatus(status: string) {
    this.clickedStatus.next(status);
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }


  onSequence(sequence) {
    this.resSequence.next(sequence);
  }


}


