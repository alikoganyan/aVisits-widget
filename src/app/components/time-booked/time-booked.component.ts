import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {SidebarSwitcherService} from '../../services/sidebar-switcher.service';
import {Styling} from '../../services/styling';
import {AppointmentService} from '../../services/appointment.service';
import {SVariables} from '../../services/sVariables';

@Component({
  selector: 'app-time-booked',
  templateUrl: './time-booked.component.html'
})
export class TimeBookedComponent implements OnInit, OnDestroy {

  sequence: string;
  subSequence: Subscription;

  masters = [];
  subMasters: Subscription;

  priceAndCount: { totalCount: number, totalPrice: number };
  subPriceAndCount: Subscription;

  city: string;
  subCityTitle: Subscription;

  salonAddress: string;
  subSalonAddress: Subscription;

  constructor(private switcherService: SwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService,
              private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.getSubscriptions();
    const app: any = [...SVariables.appointment];
    app.map(v => {
      console.log(v);
      v.salon_id = SVariables.salonId;
      v.day = SVariables.date;
      v.client_id = SVariables.clientId;
    });
    this.appointmentService.createAppointment(app).subscribe(response => {
        console.log(response);
      },
      error => console.log('Something went wrong!'));
  }

  goBack(selectCity: string) {
    this.switcherService.onClickedStatus(selectCity);
  }

  goNext() {
    this.switcherService.onClickedStatus(this.sequence);
    this.sidebarSwitcherService.selectMasters([]);
    this.sidebarSwitcherService.getPriceAndCount({totalCount: 0, totalPrice: 0});
    this.sidebarSwitcherService.userContact({id: null, email: '', first_name: '', comment: '', phone: ''});
  }

  onClose() {
    this.switcherService.clickedStart.next('button');
    this.switcherService.onClickedStatus('');
    this.sidebarSwitcherService.selectMasters([]);
    this.sidebarSwitcherService.getPriceAndCount({totalCount: 0, totalPrice: 0});
    this.sidebarSwitcherService.userContact({id: null, email: '', first_name: '', comment: '', phone: ''});
  }


  getSubscriptions() {
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.sequence = sequence[0];
    });
    if (SVariables.masterOrService === 'Master') {
      this.subMasters = this.sidebarSwitcherService.employeesServices.subscribe(employeesServices => {
        this.masters = employeesServices;
        console.log(employeesServices);
      });
    } else {
      this.masters = SVariables.appointment;
      console.log(SVariables.appointment);
    }

    this.subPriceAndCount = this.sidebarSwitcherService.priceAndCount.subscribe(priceAndCount => {
      this.priceAndCount = priceAndCount;
    });
    this.subCityTitle = this.sidebarSwitcherService.cityTitle.subscribe(cityTitle => {
      this.city = cityTitle;
    });
    this.subSalonAddress = this.sidebarSwitcherService.salonAddress.subscribe(salonAddress => {
      this.salonAddress = salonAddress;
    });
  }


  ngOnDestroy() {
    this.subSequence.unsubscribe();
    SVariables.masterOrService === 'Master' &&  this.subMasters.unsubscribe();
    this.subCityTitle.unsubscribe();
    this.subSalonAddress.unsubscribe();
  }

  /* STYLES FROM URL COLOR */
  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

}
