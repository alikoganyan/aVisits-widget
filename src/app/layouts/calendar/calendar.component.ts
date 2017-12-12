import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SDate} from '../../models/date';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output() sendedDate = new EventEmitter<SDate>();

  days = [0, 1, 2, 3, 4, 5, 6];

  myOwnCalendarDays: SDate[] = [];
  selectedDate: SDate;

  positionSlider = 0;
  calendarLength = 2500;


  constructor() {
  }

  onSelectDate(date: SDate) {
    this.selectedDate = date;
    this.sendedDate.emit(date);
  }

  nextDate() {
    const lastDate = this.myOwnCalendarDays.length + 1;
    this.myOwnCalendarDays.push(
      {
        day: moment(new Date()).add(lastDate, 'days').get('date'),
        weekday: moment(new Date()).locale('ru').add(lastDate, 'days').format('dddd'),
        month: moment(new Date()).locale('ru').add(lastDate, 'days').format('MMMM').charAt(0).toUpperCase() +
        moment(new Date()).locale('ru').add(lastDate, 'days').format('MMMM').slice(1),
        year: moment(new Date()).locale('ru').add(lastDate, 'days').format('Y')
      }
    );
    this.positionSlider -= 100;
    this.calendarLength += 100;
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
        day: moment(new Date()).add(v, 'days').get('date'),
        weekday: moment(new Date()).locale('ru').add(v, 'days').format('dddd'),
        month: moment(new Date()).locale('ru').add(v, 'days').format('MMMM').charAt(0).toUpperCase() +
        moment(new Date()).locale('ru').add(v, 'days').format('MMMM').slice(1),
        year: moment(new Date()).locale('ru').add(v, 'days').format('Y')
      });
    });
    this.selectedDate = this.myOwnCalendarDays[0];
  }

}

// interface Date {
//   day: number;
//   weekday: string;
//   month: string;
//   year: string;
// }

