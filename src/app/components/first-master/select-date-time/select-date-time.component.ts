import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';
import {SwitcherService} from '../../../services/switcher.service';
import {CityService} from '../../../services/city.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../../services/sidebar-switcher.service';
import {SDate} from '../../../models/date';
import {SVariables} from '../../../services/sVariables';
import {Appointment} from '../../../models/appointment';
import {GetDataService} from '../../../services/get-data.service';
import {Styling} from '../../../services/styling';

@Component({
  selector: 'app-select-date-time',
  templateUrl: './select-date-time.component.html'
})
export class SelectDateTimeComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  index: number;
  subSequence: Subscription;

  employeesServices: any = [];
  subEmployeesServices: Subscription;

  date: SDate = {
    day: moment(new Date()).add(0, 'days').format('DD'),
    weekday: moment(new Date()).locale('ru').add(0, 'days').format('dddd'),
    month: moment(new Date()).locale('ru').add(0, 'days').format('MMMM').charAt(0).toUpperCase() +
    moment(new Date()).locale('ru').add(0, 'days').format('MMMM').slice(1),
    year: moment(new Date()).locale('ru').add(0, 'days').format('Y'),
    working_status: null
  };

  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService,
              private getDataService: GetDataService) {
  }

  onSelectTime(time, employeesService, index: number) {
    this.employeesServices[index].time = time;
  }

  getTimes() {
    this.getDataService.getTimes().subscribe(response => {
        console.log(response);
        response['data'].schedule.map((v, i) => {
          this.employeesServices[i].timesToDisplay = v.periods;
          this.employeesServices[i].date = this.date;
        });
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
        }
      });
  }

  getSelectedDate(date: SDate) {
    SVariables.date = `${date.year}-${moment().locale('ru').month(date.month).format('MM')}-${date.day}`;
    this.getDataService.getTimes().subscribe(response => {
        response['data'].schedule.map((v, i) => {
          this.employeesServices[i].timesToDisplay = v.periods;
          this.employeesServices[i].time = '';
          this.employeesServices[i].date = date;
        });
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
        }
      });
  }

  ngOnInit() {
    this.getSubscriptions();
    this.getTimes();
    this.navbarSwitcherService.changeCount(this.index);
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
  }

  goNext() {
    let goNext = true;
    const appointment: Appointment[] = [];
    this.employeesServices.map(v => {
      const app = {
        employee_id: null,
        from_time: '',
        services: []
      };
      app.employee_id = v.id;
      app.from_time = v.time;
      v.employeeServices.map(val => {
        app.services.push(val.id);
      });
      appointment.push(app);
      !v.time && (goNext = false);
    });
    SVariables.appointment = appointment;
    console.log(SVariables.appointment);
    goNext && this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
  }

  onClose() {
    this.interrapt = true;
  }

  getSubscriptions() {
    this.subInterrupt = this.navbarSwitcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('m_time');
      this.sequence = sequence;
    });
    this.subEmployeesServices = this.sidebarSwitcherService.employeesServices.subscribe(employeesServices => {
      this.employeesServices = employeesServices;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
    this.subEmployeesServices.unsubscribe();
  }

  /* STYLES FROM URL COLOR */
  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

  timeClass() {
    return Styling.globalWidgetsStyles.timeClass;
  }

}

