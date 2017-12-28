import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
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


  randomEmployeeSequence = SVariables.randomEmployeeSequence;
  allEmployeesTimesTogether: any = [];

  goNextPage: boolean;

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

    if (!SVariables.randomEmployeeSequence) {
      console.log(this.employeesServices);
      this.getDataService.getTimes().subscribe(response => {
          console.log(response);
          response['data'].schedule.map((v, i) => {
            if(this.employeesServices[i].employee_id === v.id) {
              this.employeesServices[i].timesToDisplay = v.periods;
              this.employeesServices[i].date = this.date;
              this.employeesServices[i].timesToDisplayCount =  v.periods.length;
            }
          });
        },
        error => console.log('Something went wrong!'));
      // console.log(this.employeesServices);
      // console.log('******');
      // let arr3: any = [];
      // arr3 = [...this.employeesServices.sort(([...a], [...b]) => b.timesToDisplay.length - a.timesToDisplay.length)];
    } else {
      this.getDataService.getEmployeesAndTimes().subscribe(response => {
          this.forLastSequenceEmployeesFreeTimes(response['data']);
        },
        error => console.log('Something went wrong!'));
    }
  }

  getSelectedDate(date: SDate) {
    SVariables.date = `${date.year}-${moment().locale('ru').month(date.month).format('MM')}-${date.day}`;

    if(!SVariables.randomEmployeeSequence) {
      this.getDataService.getTimes().subscribe(response => {
          response['data'].schedule.map((v, i) => {
            if(this.employeesServices[i].employee_id === v.id) {
              this.employeesServices[i].timesToDisplay = v.periods;
              this.employeesServices[i].time = '';
              this.employeesServices[i].date = date;
              this.employeesServices[i].timesToDisplayCount =  v.periods.length;
            }
          });
        },
        error => console.log('Something went wrong!'));
          console.log(this.employeesServices);
    } else {
      this.getDataService.getEmployeesAndTimes().subscribe(response => {
          this.forLastSequenceEmployeesFreeTimes(response['data']);
        },
        error => console.log('Something went wrong!'));
    }


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
    const appointment: Appointment[] = [];
    !SVariables.randomEmployeeSequence && this.forAppointmentMethod(this.employeesServices, appointment);
    SVariables.randomEmployeeSequence && this.forAppointmentMethod2(this.allEmployeesTimesTogether, appointment);
    SVariables.appointment = appointment;
    // console.log(SVariables.appointment);
    console.log(this.goNextPage);
    this.goNextPage && this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
  }

  forAppointmentMethod(employeesServices, appointment) {
    let goNext = true;
    employeesServices.map(v => {
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
      this.goNextPage = goNext;
    });
  }

  forAppointmentMethod2(employeesServices, appointment) {
    let goNext = true;
    employeesServices.map(v => {
      console.log(v);
      const app = {
        employee_id: null,
        from_time: '',
        services: [],
        all_length_services: [],
        master_date: null
      };
      app.employee_id = v.checkedRandomEmployeeId;
      app.from_time = v.time;
      app.all_length_services = v.employeeServices;
      app.master_date = this.date;
      v.employeeServices.map(val => {
        app.services.push(val.id);
      });
      !v.time && (goNext = false);
      appointment.push(app);
      this.goNextPage = goNext;
    });
  }

  onClose() {
    this.interrapt = true;
  }

  getSubscriptions() {
    this.subInterrupt = this.navbarSwitcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      !SVariables.randomEmployeeSequence ? this.index = sequence.indexOf('m_time') : this.index = sequence.indexOf('s_time');
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


  /* FOR LAST SEQUENCE */
  forLastSequenceEmployeesFreeTimes(response) {
    this.allEmployeesTimesTogether = [...SVariables.employeesAndTimes];
    response.map((value, valIndex) => {
      const employee_id_for_cat = [];
      const cat_emp_per_by_min = [];
      const cat_emp_per_by_time = [];
      value.employees.map(employee => {
        employee.periods.map(period => {
          let period_number = period.split(':');
          const period_number_minute = (+period_number[0] * 60) + (+period_number[1]);
          cat_emp_per_by_min.push(period_number_minute);
        });
        employee_id_for_cat.push(employee.id);
      });
      let remove_duplicate_minus = cat_emp_per_by_min.filter((elem, index, self) => index === self.indexOf(elem)).sort((a, b) => a - b);
      remove_duplicate_minus.map(time => {
        const period_hour = Math.floor(time / 60);
        let period_min: any = time % 60;
        period_min === 0 && (period_min = period_min.toString() + '0');
        cat_emp_per_by_time.push(`${period_hour}:${period_min}`);
      });
      this.allEmployeesTimesTogether[valIndex].employee_id_for_cat = employee_id_for_cat;
      this.allEmployeesTimesTogether[valIndex].allCatTimes = cat_emp_per_by_time;
    });
    this.allEmployeesTimesTogether = [...this.allEmployeesTimesTogether.sort((a, b) => b.allCatTimes.length - a.allCatTimes.length)];
  }

  onSelectTimeLastSequence(time: string, index: number) {
    this.allEmployeesTimesTogether[index].time = time;
    let item = this.allEmployeesTimesTogether[index].employee_id_for_cat[Math.floor(Math.random() * this.allEmployeesTimesTogether[index].employee_id_for_cat.length)];
    this.allEmployeesTimesTogether[index].checkedRandomEmployeeId = item;
    console.log(this.allEmployeesTimesTogether[index]);
    console.log(item);
  }
/* END FOR LAST SEQUENCE */


  /* STYLES FROM URL COLOR */
  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

  timeClass() {
    return Styling.globalWidgetsStyles.timeClass;
  }

}

