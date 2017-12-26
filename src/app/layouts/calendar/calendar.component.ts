import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SDate} from '../../models/date';
import * as moment from 'moment';
import {GetDataService} from '../../services/get-data.service';
import {Styling} from "../../services/styling";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  @Output() sendedDate = new EventEmitter<SDate>();

  days = [0, 1, 2, 3, 4, 5, 6];

  myOwnCalendarDays: SDate[] = [];
  selectedDate: SDate;

  positionSlider = 0;
  calendarLength = 2500;

  from: string;
  to: string;
  hoverDate: any;
  constructor(private getDataService: GetDataService) {
  }

  onSelectDate(date: SDate) {
    if (date.working_status === 1) {
      this.selectedDate = date;
      this.sendedDate.emit(date);
    }
  }

  nextDate() {
    const lastDay = this.myOwnCalendarDays.length + 1;
    const lastDate = {
      day: moment(new Date()).add(lastDay, 'days').format('DD'),
      weekday: moment(new Date()).locale('ru').add(lastDay, 'days').format('dddd'),
      month: moment(new Date()).locale('ru').add(lastDay, 'days').format('MMMM').charAt(0).toUpperCase() +
      moment(new Date()).locale('ru').add(lastDay, 'days').format('MMMM').slice(1),
      year: moment(new Date()).locale('ru').add(lastDay, 'days').format('Y'),
      working_status: 1
    };
    this.myOwnCalendarDays.push(lastDate);
    this.positionSlider -= 100;
    this.calendarLength += 100;

    const dateString = `${lastDate.year}-${moment().locale('ru').month(lastDate.month).format('MM')}-${lastDate.day}`;

    this.getDataService.getEmployeeCalendar(dateString, dateString).subscribe(response => {
        lastDate.working_status = response.data['calendar'][0].working_status;
      },
      error => console.log('Something went wrong'));
  }


  prevDate() {
    if (this.positionSlider < 0) {
      this.positionSlider += 100;
      this.calendarLength -= 100;
      setTimeout(() => this.myOwnCalendarDays.pop(), 1000);
    }
  }


  ngOnInit() {
    this.days.map(v => {
      this.myOwnCalendarDays.push({
        day: moment(new Date()).add(v, 'days').format('DD'),
        weekday: moment(new Date()).locale('ru').add(v, 'days').format('dddd'),
        month: moment(new Date()).locale('ru').add(v, 'days').format('MMMM').charAt(0).toUpperCase() +
        moment(new Date()).locale('ru').add(v, 'days').format('MMMM').slice(1),
        year: moment(new Date()).locale('ru').add(v, 'days').format('Y'),
        working_status: 1
      });
    });
    this.selectedDate = this.myOwnCalendarDays[0];
    this.from = `${this.myOwnCalendarDays[0].year}-${moment().locale('ru').month(this.myOwnCalendarDays[0].month).format('MM')}-${this.myOwnCalendarDays[0].day}`;
    this.to = `${this.myOwnCalendarDays[this.myOwnCalendarDays.length - 1].year}-${moment().locale('ru').month(this.myOwnCalendarDays[this.myOwnCalendarDays.length - 1].month).format('MM')}-${this.myOwnCalendarDays[this.myOwnCalendarDays.length - 1].day}`;
    this.getEmployeeCalendar();
  }


  getEmployeeCalendar() {
    this.getDataService.getEmployeeCalendar(this.from, this.to).subscribe(response => {
        response.data['calendar'].map((val, ind) => {
          this.myOwnCalendarDays[ind].working_status = val.working_status;
        });
      },
      error => console.log('Something wnet wrong!'));
  }

  /* STYLES FROM URL COLOR */

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }


  ngStyleMethod(date) {
    return (date === this.selectedDate && this.radioStyle()) || (this.hoverDate === date && Styling.globalWidgetsStyles.hoverColor);
  }

  hoverStyleOn(date) {
    if (date.working_status !== 0) { this.hoverDate = date; }
  }

  hoverStyleOff(date) {
    if (this.selectedDate !== date) { this.hoverDate = ''; }
  }

  ngStyleMethodP(date) {
    return (date === this.selectedDate && {color: 'white'}) || (this.hoverDate === date && {color: Styling.color});
  }

}

