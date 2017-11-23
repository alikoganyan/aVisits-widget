import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Master} from '../models/master';

@Injectable()
export class SwitcherService {

  clickedStart = new Subject<string>();


  private selectedCity = new BehaviorSubject('default message'); // selected city
  cityTitle = this.selectedCity.asObservable();

  private selectedAddress = new BehaviorSubject('default message');  // selected address
  salonAddress = this.selectedAddress.asObservable();

  private messageSource = new BehaviorSubject('default message');  // Master or Service first
  currentMessage = this.messageSource.asObservable();

  private count = new BehaviorSubject(1);  // count for adding active class navbar
  active = this.count.asObservable();

  private userContacts = new BehaviorSubject({email: '', name: '', tel: ''});  // userContacts here
  contact = this.userContacts.asObservable();

  private selectedMasters = new BehaviorSubject([]);  // selected masters here
  masters = this.selectedMasters.asObservable();

  private clickedStatus = new BehaviorSubject('select-city'); // status here
  status = this.clickedStatus.asObservable();

  private interruptStatus = new BehaviorSubject(false); // show hide interrupt components
  interrupt = this.interruptStatus.asObservable();


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
  sequence = this.resSequence.asObservable();


  constructor() {
  }

  onSequence(sequence) {
    this.resSequence.next(sequence);
  }


  changeInterruptStatus(interrupt: boolean) {
    this.interruptStatus.next(interrupt);
  }


  onClickedStatus(status: string) {
    this.clickedStatus.next(status);
  }


  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  selectCity(city: string) {
    this.selectedCity.next(city);
  }

  selectAddress(address: string) {
    this.selectedAddress.next(address);
  }

  changeCount(count: number) {
    this.count.next(count);
  }

  userContact(contacts: { email: string, name: string, notes?: string, tel: string }) {
    this.userContacts.next(contacts);
  }

  selectMasters(masters: Master[]) {
    this.selectedMasters.next(masters);
  }


}


