import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Master} from '../../models/master';
import {Client} from '../../models/client';
import {SidebarSwitcherService} from '../../services/sidebar-switcher.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {

  checkedInfo: CheckedInfo = new CheckedInfo();

  masters: Master[] = [];
  subMasters: Subscription;

  priceAndCount: { totalCount: number, totalPrice: number };
  subPriceAndCount: Subscription;

  subCityTitle: Subscription;
  subSalonAddress: Subscription;
  subContacts: Subscription;


  constructor(private sidebarSwitcherService: SidebarSwitcherService) {
  }

  ngOnInit() {
    this.subscriptionsMethod();
  }

  subscriptionsMethod() {
    this.subCityTitle = this.sidebarSwitcherService.cityTitle.subscribe(cityTitle => {
      this.checkedInfo['city'] = cityTitle;
    });
    this.subSalonAddress = this.sidebarSwitcherService.salonAddress.subscribe(salonAddress => {
      this.checkedInfo['address'] = salonAddress;
    });
    this.subContacts = this.sidebarSwitcherService.contact.subscribe(contacts => {
      this.checkedInfo['contacts'] = contacts;
    });
    this.subMasters = this.sidebarSwitcherService.masters.subscribe(masters => {
      this.masters = masters;
    });
    this.subPriceAndCount = this.sidebarSwitcherService.priceAndCount.subscribe(priceAndCount => {
      this.priceAndCount = priceAndCount;
    });
  }


  ngOnDestroy() {
    this.subCityTitle.unsubscribe();
    this.subSalonAddress.unsubscribe();
    this.subContacts.unsubscribe();
    this.subMasters.unsubscribe();
    this.subPriceAndCount.unsubscribe();
  }

}


class CheckedInfo {
  contacts: Client;
  city: string;
  address: string;
}


