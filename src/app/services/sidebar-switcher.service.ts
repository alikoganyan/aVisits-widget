import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Client} from '../models/client';
import {Master} from '../models/master';

@Injectable()
export class SidebarSwitcherService {

  private selectedAddress = new BehaviorSubject('default message');  // selected address
  salonAddress = this.selectedAddress.asObservable();

  private userContacts = new BehaviorSubject({email: '', first_name: '', id: null, phone: ''});  // userContacts here
  contact = this.userContacts.asObservable();

  private selectedMasters = new BehaviorSubject([]);  // selected masters here
  masters = this.selectedMasters.asObservable();

  private totalPriceAndCount = new BehaviorSubject({totalCount: 0, totalPrice: 0});  // chosen services price and count
  priceAndCount = this.totalPriceAndCount.asObservable();

  private selectedEmployeesServices = new BehaviorSubject([]);  // employee services
  employeesServices = this.selectedEmployeesServices.asObservable();


  constructor() {
  }

  selectAddress(address: string) {
    this.selectedAddress.next(address);
  }

  userContact(contacts: Client) {
    this.userContacts.next(contacts);
  }

  selectMasters(masters: Master[]) {   // selected masters
    this.selectedMasters.next(masters);
  }

  getPriceAndCount(priceAndCount: { totalCount: number, totalPrice: any }) {
    this.totalPriceAndCount.next(priceAndCount);
  }

  getSelectedEmployeesServices(selectedEmployeesServices) {
    this.selectedEmployeesServices.next(selectedEmployeesServices);
  }


}
