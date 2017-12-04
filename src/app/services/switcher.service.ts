import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Master} from '../models/master';

@Injectable()
export class SwitcherService {

  clickedStart = new Subject<string>();

  private clickedStatus = new BehaviorSubject('select-city'); // status here
  status = this.clickedStatus.asObservable();

  private messageSource = new BehaviorSubject('default message');  // Master or Service first
  currentMessage = this.messageSource.asObservable();

  /* Navbar switcher here */

  private count = new BehaviorSubject(1);  // count for adding active class navbar
  active = this.count.asObservable();


  private interruptStatus = new BehaviorSubject(false); // show hide interrupt components
  interrupt = this.interruptStatus.asObservable();

  /* Navbar switcher end */


  /* Sidebar switcher here */


  private selectedCity = new BehaviorSubject('default message'); // selected city
  cityTitle = this.selectedCity.asObservable();

  private selectedAddress = new BehaviorSubject('default message');  // selected address
  salonAddress = this.selectedAddress.asObservable();

  private userContacts = new BehaviorSubject({email: '', name: '', tel: ''});  // userContacts here
  contact = this.userContacts.asObservable();

  private selectedMasters = new BehaviorSubject([]);  // selected masters here
  masters = this.selectedMasters.asObservable();

  private totalPriceAndCount = new BehaviorSubject({totalCount: 0, totalPrice: 0});  // chosen services price and count
  priceAndCount = this.totalPriceAndCount.asObservable();

  /* End sidebar switcher */


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

  onClickedStatus(status: string) {
    this.clickedStatus.next(status);
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  /* Navbar switcher here */

  changeCount(count: number) {
    this.count.next(count);
  }

  changeInterruptStatus(interrupt: boolean) {   // show hide interrupt components
    this.interruptStatus.next(interrupt);
  }

  /* Navbar switcher end */


  /* Sidebar switcher here */

  selectCity(city: string) {   // selected city
    this.selectedCity.next(city);
  }

  selectAddress(address: string) {
    this.selectedAddress.next(address);
  }


  userContact(contacts: { email: string, name: string, notes?: string, tel: string }) {
    this.userContacts.next(contacts);
  }

  selectMasters(masters: Master[]) {   // selected masters
    this.selectedMasters.next(masters);
  }

  getPriceAndCount(priceAndCount: {totalCount: number, totalPrice: number}) {
    this.totalPriceAndCount.next(priceAndCount);
  }

  /* End sidebar switcher */


  onSequence(sequence) {
    this.resSequence.next(sequence);
  }


}


