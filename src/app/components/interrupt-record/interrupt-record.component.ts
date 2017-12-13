import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Subscription} from 'rxjs/Subscription';
import {NavbarSwitcherService} from '../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../services/sidebar-switcher.service';

@Component({
  selector: 'app-interrupt-record',
  templateUrl: './interrupt-record.component.html'
})
export class InterruptRecordComponent implements OnInit, OnDestroy {

  status: string;
  subStatus: Subscription;

  constructor(private switcherService: SwitcherService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService) {}

  ngOnInit() {
    this.subStatus = this.switcherService.status.subscribe((status: string) => {
      this.status = status;
    });
  }


  discard(button: string, status: string) {
    this.switcherService.clickedStart.next(button);
    this.switcherService.onClickedStatus(status);

    this.sidebarSwitcherService.selectMasters([]);
    this.sidebarSwitcherService.getPriceAndCount({totalCount: 0, totalPrice: 0});
    this.sidebarSwitcherService.userContact({id: null, email: '', first_name: '', comment: '', phone: ''});
  }

  onClose() {
    this.navbarSwitcherService.changeInterruptStatus(false);
  }

  ngOnDestroy() {
    this.subStatus.unsubscribe();
  }
}
