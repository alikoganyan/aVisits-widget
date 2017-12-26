import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Subscription} from 'rxjs/Subscription';
import {NavbarSwitcherService} from '../../services/navbar-switcher.service';
import {Styling} from '../../services/styling';
import {SVariables} from '../../services/sVariables';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html'
})
export class HeaderNavComponent implements OnInit, OnDestroy {


  checkedNavbar: any;
  active: number;

  subCount: Subscription;

  sequence: string[];
  subSequence: Subscription;


  navbarMasters = {
    address: {title1: 'Выберите', title2: 'адрес', active: 1, mobileTitle: 'Выберите адрес'},
    indicate_contacts: {title1: 'Укажите', title2: 'контакты', active: 2, mobileTitle: 'Укажите контакты'},
    m_employee: {title1: 'Выберите', title2: 'мастера', active: 3, mobileTitle: 'Выберите мастера'},
    m_service: {title1: 'Выберите', title2: 'услуги', active: 4, mobileTitle: 'Выберите услуги'},
    m_time: {title1: 'Выберите', title2: 'время и дату', active: 5, mobileTitle: 'Выберите время и дату'},
  };


  navbarServices = {
    address: {stage: 1, title1: 'Выберите', title2: 'адрес', active: 1, mobileTitle: 'Выберите адрес'},
    indicate_contacts: {stage: 2, title1: 'Укажите', title2: 'контакты', active: 2, mobileTitle: 'Укажите контакты'},
    s_service: {stage: 3, title1: 'Выберите', title2: 'услуги', active: 3, mobileTitle: 'Выберите услуги'},
    s_employee_time: {stage: 4, title1: 'Выберите', title2: 'мастера и время', active: 4, mobileTitle: 'Выберите мастера и время'}
  };

  navbarServices_last = {
    address: {stage: 1, title1: 'Выберите', title2: 'адрес', active: 1, mobileTitle: 'Выберите адрес'},
    indicate_contacts: {stage: 2, title1: 'Укажите', title2: 'контакты', active: 2, mobileTitle: 'Укажите контакты'},
    s_service: {stage: 3, title1: 'Выберите', title2: 'услуги', active: 3, mobileTitle: 'Выберите услуги'},
    s_time: {title1: 'Выберите', title2: 'время и дату', active: 4, mobileTitle: 'Выберите время и дату'},
  };


  constructor(private switcherService: SwitcherService,
              private navbarSwitcherService: NavbarSwitcherService) {
  }

  ngOnInit() {
    this.subCount = this.navbarSwitcherService.active.subscribe(active => {
      this.active = active;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      let seq = [...sequence];
      seq.shift();
      seq.pop();
      this.sequence = [...seq];
      // this.sequence.length === 4 ? this.checkedNavbar = {...this.navbarServices} : this.checkedNavbar = {...this.navbarMasters};
      if(this.sequence.length === 4) {
        SVariables.randomEmployeeSequence === true ? this.checkedNavbar = {...this.navbarServices_last} : this.checkedNavbar = {...this.navbarServices};

      } else {
        this.checkedNavbar = {...this.navbarMasters}
      }
    });
  }

  ngOnDestroy() {
    this.subCount.unsubscribe();
  }


  fontColor() {
    return Styling.globalWidgetsStyles.fontColor;
  }

}

// interface Navbar {
//   stage: number;
//   title1: string;
//   title2: string;
//   active: number;
// }
