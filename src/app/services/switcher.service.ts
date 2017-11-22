import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Master} from '../models/master';

@Injectable()
export class SwitcherService {

  clickedStart = new Subject<string>();
  clickedStatus = new Subject<string>();
  // private clickedStatuss = new BehaviorSubject('default message'); // status
  // status = this.clickedStatuss.asObservable();




  private selectedCity = new BehaviorSubject('default message'); // selected city
  cityTitle = this.selectedCity.asObservable();

  private selectedAddress = new BehaviorSubject('default message');  // selected address
  salonAddress = this.selectedAddress.asObservable();

  private messageSource = new BehaviorSubject('default message');  // Master or Service first
  currentMessage = this.messageSource.asObservable();

  private count = new BehaviorSubject(1);
  active = this.count.asObservable();


  private userContacts = new BehaviorSubject({email: '', name: '', tel: ''});  // userContacts hre
  contact = this.userContacts.asObservable();


  private selectedMasters = new BehaviorSubject([]);
  masters = this.selectedMasters.asObservable();


  constructor() {
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

  //
  // onClickedStatus(status: string) {
  //   this.clickedStatus.next(status);
  // }

}



