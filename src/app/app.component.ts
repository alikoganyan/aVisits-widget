import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  allTimes: string[] = [];
  bookedTimes: string[] = [];

  allTimesMinut = [];
  bookedTimesMinut = [];

  constructor() {

    /*let increment: any = 30;
    const start = '10:00';
    const end = '18:00';

    const startTime = start.toString().split(':');
    const endTime = end.toString().split(':');
    increment = parseInt(increment, 10);

    const pad = (n) => (n < 10) ? '0' + n.toString() : n;
    const startHr = parseInt(startTime[0], 10);
    const startMin = parseInt(startTime[1], 10);
    const endHr = parseInt(endTime[0], 10);
    const endMin = parseInt(endTime[1], 10);
    let currentHr = startHr, currentMin = startMin,
      previous = currentHr + ':' + pad(currentMin),
      current = '';
    const r = [];
    do {
      currentMin += increment;
      if ((currentMin % 60) === 0 || currentMin > 60) {
        currentMin = (currentMin === 60) ? 0 : currentMin - 60;
        currentHr += 1;
      }
      current = currentHr + ':' + pad(currentMin);
      // r.push(previous + ' - ' + current);
      r.push(previous);
      previous = current;
    } while (currentHr !== endHr);
    r.push(current);
    // endMin % 60 !== 0 && r.push(`${endHr}:${endMin}`);
    // console.log(r);

    this.allTimes = r;
*/

    let startTime: any = '10:00';
    let endTime: any = '18:20';

    const interval = 120;
    startTime = startTime.toString().split(':');
    endTime = endTime.toString().split(':');
    const start = (+startTime[0]) * 60 + (+startTime[1]);
    const end = (+endTime[0]) * 60 + (+endTime[1]);
    let stHour = 0;
    let stMin: any = 0;
    let currentDate: any = 0;
    const times = [];

    for (let i = start; i <= end; i += interval) {
      this.allTimesMinut.push(i);
      stHour = Math.floor(i / 60);
      stMin = i % 60 !== 0 ? i % 60 : (i % 60).toString() + '0';
      currentDate = `${stHour}:${stMin}`;
      times.push(currentDate);
    }
    end !== this.allTimesMinut[this.allTimesMinut.length - 1] && this.allTimesMinut.push(end);

    this.allTimes = times;


    console.log(this.allTimes);
    console.log(this.allTimesMinut);

    this.freeTimes();
    // this.TimesLogic();
    // this.finisheMethod();

  }


  freeTimes() {

    const allFreeTimes: any = [
      {start: '10:00', end: '13:00'},
      {start: '15:00', end: '15:40'},
      {start: '17:35', end: '18:00'}
    ];

    let stHour = 0;
    let stMin: any = 0;
    let currentDate: any = 0;
    const times = [];

    allFreeTimes.map((value, index) => {


      let startTime = value.start;
      let endTime = value.end;


      const interval = 30;
      startTime = startTime.toString().split(':');
      endTime = endTime.toString().split(':');
      const start = (+startTime[0]) * 60 + (+startTime[1]);
      const end = (+endTime[0]) * 60 + (+endTime[1]);




      for (let ind = start; ind <= end; ind += interval) {
        this.allTimesMinut.push(ind);
        stHour = Math.floor(ind / 60);
        stMin = ind % 60 !== 0 ? ind % 60 : (ind % 60).toString() + '0';
        currentDate = `${stHour}:${stMin}`;
        times.push(currentDate);
      }

      // end !== times[times.length - 1] && times.push(end);

    });






    console.log(times);

  }


  /*TimesLogic() {

    let startTime: any = '17:40';
    let endTime: any = '18:00';
    const interval = 15;

    startTime = startTime.toString().split(':');
    endTime = endTime.toString().split(':');
    const start = (+startTime[0]) * 60 + (+startTime[1]);
    const end = (+endTime[0]) * 60 + (+endTime[1]);


    let stHour = 0;
    let stMin: any = 0;
    let currentDate: any = 0;
    const times = [];

    for (let i = start; i <= end; i += interval) {
      this.bookedTimesMinut.push(i);
      stHour = Math.floor(i / 60);
      stMin = i % 60 !== 0 ? i % 60 : (i % 60).toString() + '0';
      currentDate = `${stHour}:${stMin}`;
      times.push(currentDate);
    }
    end !== this.bookedTimesMinut[this.bookedTimesMinut.length - 1] && this.bookedTimesMinut.push(end);
    this.bookedTimes = times;
    console.log(this.bookedTimes);
    console.log(this.bookedTimesMinut);
  }*/


  /*finisheMethod() {


    const interval = 15;
    let lastTime: any = 0;
    const stHour = this.bookedTimesMinut[0];
    const stMin: any = this.bookedTimesMinut[this.bookedTimesMinut.length - 1];

    const temp = [];
    let isFreeTime = false;
    this.allTimesMinut.map((time, index) => {   // start =  600 630 660
      isFreeTime = true;
      lastTime = time;
      while (stHour <= lastTime && lastTime <= stMin) {
        lastTime += interval;
        if (lastTime >= this.allTimesMinut[index + 1]) {
          isFreeTime = false;
          break;
        }
      }
      if (isFreeTime === true && temp.includes(lastTime) === false) {
        temp.push(lastTime);
      }
    });
    console.log(temp);


  }*/


}










