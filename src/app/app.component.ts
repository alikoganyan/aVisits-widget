import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /*periods = [];
  freePeriods = [];
  searchStep = 15;
  displayStep = 30;
  timesToDisplay = [];

  finisheDates = [];
  dates = [];*/

  constructor() {
    /*this.periods = this.getPeriods();
    this.freePeriods = this.getFreePeriods();
    this.periods.map((v, k) => {
      this.timesToDisplay[k] = [];
      let tempStart = this.parseTimeToInteger(v.start);
      const tempEnd = this.parseTimeToInteger(v.end);
      let next = tempStart + this.displayStep;
      let lastLoop = false;
      while (tempStart <= tempEnd && !lastLoop) {
        if (tempStart === tempEnd) {
          lastLoop = true;
        }
        if (this.intoFreeTime(tempStart, tempEnd)) {
          this.timesToDisplay[k].push(tempStart);
          tempStart = (next >= tempEnd) ? tempEnd : next;
          next += this.displayStep;
        } else {
          tempStart += this.searchStep;
          if (tempStart >= next) {
            tempStart = (next >= tempEnd) ? tempEnd : next;
            next += this.displayStep;
          }
        }
      }
    });
    this.met();*/
  }


  /*met() {
    this.finisheDates = this.timesToDisplay.reduce((a, b) => {
      return a.concat(b);
    });
    this.finisheDates.map((v, i) => {
      const hr = Math.floor(v / 60);
      let min: any = Math.ceil(((v / 60) - hr) * 60);
      if (min === 0) {
        min = min.toString() + '0';
      }
      const time = `${hr}:${min}`;
      this.dates.push(time);
    });
  }

  getPeriods() {
    return [
      {
        id: 1,
        schedule_id: 4,
        start: '10:00',
        end: '12:00',
      },
      {
        id: 2,
        schedule_id: 4,
        start: '16:00',
        end: '18:20',
      }
    ];
  }

  getFreePeriods() {
    return [
      {
        id: 1,
        schedule_id: 4,
        start: '10:40',
        end: '12:00',
      },
      {
        id: 1,
        schedule_id: 4,
        start: '17:15',
        end: '18:20',
      }
    ];
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
  }*/

}










