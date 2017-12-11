import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Subscription} from 'rxjs/Subscription';
import {NavbarSwitcherService} from '../../services/navbar-switcher.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit, OnDestroy {
  chackedNavbar;
  active: number;
  sub: Subscription;
  subCount: Subscription;

  sequence = [
    'select_address',
    'indicate_contacts',
    'select_master',
    'select_services_master',
    'select_date_time'
  ];


  navbarMasters = {
    select_address: {title1: 'Выберите', title2: 'адрес', active: 1},
    indicate_contacts: {title1: 'Укажите', title2: 'контакты', active: 2},
    select_master: {title1: 'Выберите', title2: 'мастера', active: 3},
    select_services_master: {title1: 'Выберите', title2: 'услуги', active: 4},
    select_date_time: {title1: 'Выберите', title2: 'время и дату', active: 5},
  };

  /* navbarMasters = [
     {select_address: {stage: 1, title1: 'Выберите', title2: 'адрес', active: 1}},
     {indicate_contacts: {stage: 2, title1: 'Укажите', title2: 'контакты', active: 2}},
     {select_master: {stage: 3, title1: 'Выберите', title2: 'мастера', active: 3}},
     {select_services_master: {stage: 4, title1: 'Выберите', title2: 'услуги', active: 4}},
     {select_date_time: {stage: 5, title1: 'Выберите', title2: 'время и дату', active: 5}},


     /!*{stage: 1, title1: 'Выберите', title2: 'адрес', active: 1},
     {stage: 2, title1: 'Укажите', title2: 'контакты', active: 2},
     {stage: 3, title1: 'Выберите', title2: 'мастера', active: 3},
     {stage: 4, title1: 'Выберите', title2: 'услуги', active: 4},
     {stage: 5, title1: 'Выберите', title2: 'время и дату', active: 5}*!/
   ];*/

  navbarServices: Navbar[] = [
    {stage: 1, title1: 'Выберите', title2: 'адрес', active: 1},
    {stage: 2, title1: 'Укажите', title2: 'контакты', active: 2},
    {stage: 3, title1: 'Выберите', title2: 'услуги', active: 3},
    {stage: 4, title1: 'Выберите', title2: 'мастера и время ', active: 4}
  ];

  constructor(private switcherService: SwitcherService,
              private navbarSwitcherService: NavbarSwitcherService) {
  }

  ngOnInit() {
    this.sub = this.switcherService.currentMessage.subscribe(message => {
      message === 'Master' ? this.chackedNavbar = this.navbarMasters : this.chackedNavbar = this.navbarServices;
    });
    this.subCount = this.navbarSwitcherService.active.subscribe(active => {
      this.active = active;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subCount.unsubscribe();
  }

}

interface Navbar {
  stage: number;
  title1: string;
  title2: string;
  active: number;
}
