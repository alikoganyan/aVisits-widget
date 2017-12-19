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
import {AppointmentService} from '../../../services/appointment.service';
import {GetDataService} from '../../../services/get-data.service';
import {Styling} from "../../../services/styling";

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

  periods = [];
  freePeriods = [];

  active_minutes_indexes_array = [];
  selected_minutes_array_index: number;


  date: SDate = {
    day: moment(new Date()).add(0, 'days').format('DD'),
    weekday: moment(new Date()).locale('ru').add(0, 'days').format('dddd'),
    month: moment(new Date()).locale('ru').add(0, 'days').format('MMMM').charAt(0).toUpperCase() +
    moment(new Date()).locale('ru').add(0, 'days').format('MMMM').slice(1),
    year: moment(new Date()).locale('ru').add(0, 'days').format('Y'),
    working_status: null
  };


  appointment: Appointment[] = [];

  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService,
              private appointmentService: AppointmentService,
              private getDataService: GetDataService) {
  }

  onSelectTime(employeesService: any, ind: number, times: number[], i: number, time: string) {
    this.selected_minutes_array_index = ind;
    const selectedTime = employeesService.selectedTime;
    const timesInMinute = employeesService.timesToDisplay[ind];
    const clickedTime = timesInMinute[i];
    const interval = timesInMinute[timesInMinute.length - 1] - timesInMinute[0];
    const displayInterval = 30;

    if (selectedTime <= interval) {
      if (selectedTime <= (timesInMinute[timesInMinute.length - 1] - clickedTime)) {

        const arr = [];
        for (let j = 0; j <= Math.ceil(selectedTime / displayInterval); ++j) {
          arr.push(i++);
        }
        this.active_minutes_indexes_array = arr;

        const hourST = Math.floor(clickedTime / 60);
        let minST: any = (((clickedTime / 60) - hourST) * 60);
        if (minST === 0) {
          minST = minST.toString() + '0';
        }
        employeesService.startHour = `${hourST}:${minST}`;
        // console.log(`${hourST}:${minST}`);   // "from_time": "11:00"
        employeesService.from_time = `${hourST}:${minST}`;

        const hourND = Math.floor((clickedTime + selectedTime) / 60);
        let minND: any = ((((clickedTime + selectedTime) / 60) - hourND) * 60);
        if (minND === 0) {
          minND = minND.toString() + '0';
        }
        // console.log(`${hourND}:${minND}`);  // "to_time": "13:00"
        employeesService.to_time = `${hourND}:${minND}`;
      }
    }
  }


  isActive(i: number, ind: number) {
    let exist = false;
    if (this.active_minutes_indexes_array[0] === i && this.selected_minutes_array_index === ind) {
      exist = true;
    }
    // this.active_minutes_indexes_array.map(v => {
    //   if (v === i && this.selected_minutes_array_index === ind) {
    //     exist = true;
    //   }
    // });
    return exist;
  }

  getTimes() {
    this.getDataService.getTimes().subscribe(response => {
        this.timeLogic(response['data']['employees']);
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
    this.active_minutes_indexes_array = [];
    SVariables.date = `${date.year}-${moment().locale('ru').month(date.month).format('MM')}-${date.day}`;
    this.getDataService.getTimes().subscribe(response => {
        this.timeLogic(response['data']['employees']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
        }
      });
  }

  parseTimeToInteger(time) {
    const temp = time.split(':');
    return (parseInt(temp[0], 10) * 60) + parseInt(temp[1], 10);
  }

  intoFreeTime(start, end) {
    let isFree = false;
    this.freePeriods.map((v, k) => {
      const startInt = this.parseTimeToInteger(v.start);
      const endInt = this.parseTimeToInteger(v.end);
      if (startInt <= start && start <= endInt) {
        isFree = true;
        return false;
      }
    });
    return isFree;
  }


  timeLogic(param) {
    param.map((employee, index) => {
      this.employeesServices[index].timesToDisplay = [];
      this.employeesServices[index].times = [];
      this.employeesServices[index].times = [];
      this.employeesServices[index].date = this.date;
      if (employee.schedule !== null) {
        if (employee.schedule['periods'].length > 0) {

          const searchStep = 15;
          const displayStep = 30;
          const timesToDisplay = [];

          this.periods = employee.schedule['periods'];
          this.freePeriods = employee.schedule['free_periods'];

          employee.dates = [];
          employee.times = [];

          this.periods.map((v, k) => {
            timesToDisplay[k] = [];
            let tempStart = this.parseTimeToInteger(v.start);
            const tempEnd = this.parseTimeToInteger(v.end);
            let next = tempStart + displayStep;
            let lastLoop = false;
            while (tempStart <= tempEnd && !lastLoop) {
              if (tempStart === tempEnd) {
                lastLoop = true;
              }
              if (this.intoFreeTime(tempStart, tempEnd)) {
                timesToDisplay[k].push(tempStart);
                tempStart = (next >= tempEnd) ? tempEnd : next;
                next += displayStep;
              } else {
                tempStart += searchStep;
                if (tempStart >= next) {
                  tempStart = (next >= tempEnd) ? tempEnd : next;
                  next += displayStep;
                }
              }
            }
          });
          this.employeesServices[index].timesToDisplay = timesToDisplay;

          timesToDisplay.map((val, ind) => {
            const times = [];
            val.map((v, i) => {
              const hr = Math.floor(v / 60);
              let min: any = Math.ceil(((v / 60) - hr) * 60);
              if (min === 0) {
                min = min.toString() + '0';
              }
              const time = `${hr}:${min}`;
              times.push(time);
            });
            employee.times.push(times);
          });

          this.employeesServices[index].times = employee.times;
        } else {
          this.employeesServices[index].timesToDisplay = [];
          this.employeesServices[index].times = [];
        }
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
    console.log(this.employeesServices);
    this.employeesServices.map((v, i) => {
      const appointment = {
        salon_id: null,
        employee_id: null,
        from_time: '',
        to_time: '',
        day: '',
        client_id: null,
        services: []
      };
      appointment.salon_id = SVariables.salonId;
      appointment.employee_id = v.id;
      appointment.from_time = v.from_time;
      appointment.to_time = v.to_time;
      appointment.day = SVariables.date;
      appointment.client_id = SVariables.clientId;
      v.employeeServices.map((val, ind) => {
        appointment.services.push(val.id);
      });
      this.appointment.push(appointment);
    });

    this.appointmentService.createAppointment(this.appointment).subscribe(response => {
      response['status'] === 'OK' && this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
        }
      });
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
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

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

}

