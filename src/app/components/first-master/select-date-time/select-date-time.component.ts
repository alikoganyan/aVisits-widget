import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {CityService} from '../../../services/city.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../../services/sidebar-switcher.service';

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

  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService) {
  }

  onSelectTime(time: string, index: number) {
    console.log(time, index);
  }


  getTimes() {
    this.cityService.getTimes().subscribe(response => {
        this.timeLogic(response.data['employees']);
      },
      error => console.log(error));
    console.log(this.employeesServices);
  }

  getStr(data) {
    this.cityService.date = data;
    console.log(data);
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
      this.employeesServices[index].dates = [];
        if (employee.schedule !== null) {
          if (employee.schedule['periods'].length > 0) {

            const searchStep = 15;
            const displayStep = 30;
            const timesToDisplay = [];

            this.periods = employee.schedule['periods'];
            this.freePeriods = employee.schedule['free_periods'];

            employee.dates = [];

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

            const allTimes = timesToDisplay.reduce((a, b) => {
              return a.concat(b);
            });

            allTimes.map((v, i) => {
              const hr = Math.floor(v / 60);
              let min: any = Math.ceil(((v / 60) - hr) * 60);
              if (min === 0) {
                min = min.toString() + '0';
              }

              const time = `${hr}:${min}`;
              employee.dates.push(time);
            });
            this.employeesServices[index].dates = employee.dates;
          } else {
            this.employeesServices[index].dates = [];
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

