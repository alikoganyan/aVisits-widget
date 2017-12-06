import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output() sendedDate = new EventEmitter<string>();

  days = [0, 1, 2, 3, 4, 5, 6];

  myOwnCalendarDays: Date[] = [];
  selectedDate: Date;

  positionSlider = 0;
  calendarLength = 2500;


  constructor() {
  }

  onSelectDate(date: Date) {
    this.selectedDate = date;
    const time = `${date.year}-${moment().month(date.month).format('M')}-${date.day}`;
    this.sendedDate.emit(time);
  }

  nextDate() {
    const lastDate = this.myOwnCalendarDays.length + 1;
    this.myOwnCalendarDays.push(
      {
        day: moment(new Date()).add(lastDate, 'days').get('date'),
        weekday: moment(new Date()).locale('ru').add(lastDate, 'days').format('dddd'),
        month: moment(new Date()).locale('ru').add(lastDate, 'days').format('MMMM'),
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
        month: moment(new Date()).locale('ru').add(v, 'days').format('MMMM'),
        year: moment(new Date()).locale('ru').add(v, 'days').format('Y')
      });
    });
    this.selectedDate = this.myOwnCalendarDays[0];
  }

}

interface Date {
  day: number;
  weekday: string;
  month: string;
  year: string;
}

