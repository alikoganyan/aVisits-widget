import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {CityService} from '../../../services/city.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../../services/sidebar-switcher.service';
import {SDate} from '../../../models/date';
import * as moment from 'moment';
import {SVariables} from '../../../services/sVariables';

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
    day: moment(new Date()).add(0, 'days').get('date'),
    weekday: moment(new Date()).locale('ru').add(0, 'days').format('dddd'),
    month: moment(new Date()).locale('ru').add(0, 'days').format('MMMM').charAt(0).toUpperCase() +
    moment(new Date()).locale('ru').add(0, 'days').format('MMMM').slice(1),
    year: moment(new Date()).locale('ru').add(0, 'days').format('Y')
  };


  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService) {
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

        console.log(Math.ceil(selectedTime / displayInterval));
        const hourST = Math.floor(clickedTime / 60);
        let minST: any = (((clickedTime / 60) - hourST) * 60);
        if (minST === 0) {
          minST = minST.toString() + '0';
        }
        employeesService.startHour = `${hourST}:${minST}`;
        // console.log(`${hourST}:${minST}`);   // "from_time": "11:00"

        const hourND = Math.floor((clickedTime + selectedTime) / 60);
        let minND: any = ((((clickedTime + selectedTime) / 60) - hourND) * 60);
        if (minND === 0) {
          minND = minND.toString() + '0';
        }
        // console.log(`${hourND}:${minND}`);  // "to_time": "13:00"
      }
    }
  }


  isActive(i: number, ind: number) {
    let exist = false;
    this.active_minutes_indexes_array.map(v => {
      if (v === i && this.selected_minutes_array_index === ind) {
        exist = true;
      }
    });
    return exist;
  }

  getTimes() {
    this.cityService.getTimes().subscribe(response => {
        this.timeLogic(response.data['employees']);
      },
      error => console.log(error));
  }

  getSelectedDate(date: SDate) {
    this.active_minutes_indexes_array = [];
    SVariables.date = `${date.year}-${moment().month(date.month).format('M')}-${date.day}`;
    console.log(date);
    this.cityService.getTimes().subscribe(response => {
        this.timeLogic(response.data['employees']);
      },
      error => console.log(error));
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
    console.log(param);
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
          console.log(timesToDisplay);
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
    console.log(this.employeesServices);
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
      this.index = sequence.indexOf('select_date_time');
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
}

