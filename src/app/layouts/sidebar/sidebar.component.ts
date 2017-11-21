import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  checkedInfo: CheckedInfo = new CheckedInfo();
  // contacts: Contacts = new Contacts();


  subCityTitle: Subscription;
  subSalonAddress: Subscription;
  subContacts: Subscription;


  constructor(private switcherService: SwitcherService) {
  }

  ngOnInit() {
    this.subCityTitle = this.switcherService.cityTitle.subscribe(cityTitle => {
      this.checkedInfo['city'] = cityTitle;
    });
    this.subSalonAddress = this.switcherService.salonAddress.subscribe(salonAddress => {
      this.checkedInfo['address'] = salonAddress;
    });
    this.subContacts = this.switcherService.contact.subscribe(contacts => {
      this.checkedInfo['contacts'] = contacts;
    });
  }

  ngOnDestroy() {
    this.subCityTitle.unsubscribe();
    this.subSalonAddress.unsubscribe();
    this.subContacts.unsubscribe();
  }

}

class Contacts {
  constructor(public email: string, public name: string, public notes?: string, public tel?: string) {
  }
}

class CheckedInfo {
  contacts: Contacts;
  constructor(city?: string, address?: string) {
  }
}
