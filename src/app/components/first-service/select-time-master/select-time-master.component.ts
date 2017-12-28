import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {Styling} from '../../../services/styling';
import {GetDataService} from '../../../services/get-data.service';
import {SDate} from '../../../models/date';
import * as moment from 'moment';
import {SVariables} from '../../../services/sVariables';
import {Appointment} from '../../../models/appointment';

@Component({
  selector: 'app-select-time-master',
  templateUrl: './select-time-master.component.html'
})
export class SelectTimeMasterComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  subSequence: Subscription;
  index: number;

  date: SDate = {
    day: moment(new Date()).add(0, 'days').format('DD'),
    weekday: moment(new Date()).locale('ru').add(0, 'days').format('dddd'),
    month: moment(new Date()).locale('ru').add(0, 'days').format('MMMM').charAt(0).toUpperCase() +
    moment(new Date()).locale('ru').add(0, 'days').format('MMMM').slice(1),
    year: moment(new Date()).locale('ru').add(0, 'days').format('Y'),
    working_status: null
  };

  employeesAndTimes: any;

  employeeID: number;
  selectedTime: string;

  constructor(private switcherService: SwitcherService,
              private navbarSwitcherService: NavbarSwitcherService,
              private getDataService: GetDataService) {
  }

  onSelectTime(time: string, employeesAndTime, employee) {
    employeesAndTime.time = time;
    employeesAndTime.employeeID = employee.id;
    employeesAndTime.employee = employee;
  }

  getEmployeesAndTimes() {
    this.getDataService.getEmployeesAndTimes().subscribe(response => {
        this.responseLogic(response['data']);
        this.employeesAndTimes = response['data'];
        this.employeesAndTimes = [...this.employeesAndTimes.sort((a, b) => b.employees.length - a.employees.length)];
        console.log(this.employeesAndTimes);
      },
      error => console.log('Something went wrong!'));
  }

  getSelectedDate(date: SDate) {
    SVariables.date = `${date.year}-${moment().locale('ru').month(date.month).format('MM')}-${date.day}`;
    this.getDataService.getEmployeesAndTimes().subscribe(response => {
        this.responseLogic(response['data']);
        this.employeesAndTimes = [...this.employeesAndTimes.sort((a, b) => b.employees.length - a.employees.length)];
      },
      error => console.log('Something went wrong!'));
  }

  ngOnInit() {
    this.getEmployeesAndTimes();
    this.getSubscriptions();
    this.navbarSwitcherService.changeCount(this.index);
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
  }

  goNext() {
    let goNext = true;
    const appointment: Appointment[] = [];
    this.employeesAndTimes.map(employeesAndTime => {
      console.log(employeesAndTime);
      employeesAndTime.employees.length === 0 && (goNext = false);
      !employeesAndTime.hasOwnProperty('time') && (goNext = false);
      if (employeesAndTime.employeeID) {
        const app = {
          employee_id: null,
          from_time: '',
          services: [],
          employeeServices: [],
          father_name: '',
          first_name: '',
          last_name: '',
          photo: '',
          position: null,
          date: null,
          time: ''
        };
        app.father_name = employeesAndTime.employee.father_name;
        app.first_name = employeesAndTime.employee.first_name;
        app.last_name = employeesAndTime.employee.last_name;
        app.photo = employeesAndTime.employee.photo;
        app.position = employeesAndTime.employee.position;
        app.employee_id = employeesAndTime.employeeID;
        app.from_time = employeesAndTime.time;
        app.date = this.date;
        app.time = employeesAndTime.time;
        app.employeeServices = employeesAndTime.employeeServices;
        app.employeeServices.map(employeeService => {
          employeeService.price = `${employeeService.min_max_prices.min_price}-${employeeService.min_max_prices.max_price}`
        });
        employeesAndTime.services.map(servId => {
          app.services.push(servId);
        });
        appointment.push(app);
      }
    });
    SVariables.appointment = appointment;
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
      this.index = sequence.indexOf('s_employee_time');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
  }

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
      return false;
    for (let i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
  }

  responseLogic(response) {
    response.map((value, index) => {
      if (this.arraysEqual(value.services, SVariables.employeesAndTimes[index].services)) {
        const hour = Math.floor(SVariables.employeesAndTimes[index].default_duration / 60);
        const min = SVariables.employeesAndTimes[index].default_duration % 60;
        value.hour = hour;
        value.min = min;
        value.minPrice = SVariables.employeesAndTimes[index].minPrice;
        value.maxPrice = SVariables.employeesAndTimes[index].maxPrice;
        value.servicesTitles = SVariables.employeesAndTimes[index].servicesTitles;
        value.employeeServices = SVariables.employeesAndTimes[index].employeeServices;
      }
    });
  }

  /* STYLES FROM URL COLOR */

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

  timeClass() {
    return Styling.globalWidgetsStyles.timeClass;
  }

}
