import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output() sendedDate = new EventEmitter<string>();

  days = [1, 2, 3, 4, 5, 6, 7];

  myOwnCalendarDays: Date[] = [];
  selectedDate: Date;

  positionSlider = 0;
  calendarLength = 2500;


  constructor() {
  }

  onSelectDate(date: Date) {
    this.selectedDate = date;
    // console.log(this.selectedDate);
    // console.log(moment().month('декабрь').format('M'));
    // console.log(moment().locale('ru').day('вторник').get('date'));
    const time = `${date.year}-${moment().month(date.month).format('M')}-${date.day}`;
    this.sendedDate.emit(time);
  }

  nextDate() {
    const lastDate = this.myOwnCalendarDays.length + 1;
    this.myOwnCalendarDays.push(
      {
        day: moment().day(lastDate).get('date'),
        weekday: moment().locale('ru').day(lastDate).format('dddd'),
        month: moment().locale('ru').day(lastDate).format('MMMM'),
        year: moment().locale('ru').day(lastDate).format('Y')
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
        day: moment().day(v).get('date'),
        weekday: moment().locale('ru').day(v).format('dddd'),
        month: moment().locale('ru').day(v).format('MMMM'),
        year: moment().locale('ru').day(v).format('Y')
      });
    });
    console.log(this.myOwnCalendarDays);
  }

}

interface Date {
  day: number;
  weekday: string;
  month: string;
  year: string;
}

