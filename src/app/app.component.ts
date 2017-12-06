import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  allTimes: string[] = [];
  bookedTimes: string[] = [];

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
    endMin % 60 !== 0 && r.push(`${endHr}:${endMin}`);
    // console.log(r);

    this.allTimes = r;
*/
    this.second();
    this.logic();


  }


  second() {


   /* let increment: any = 15;
    const start = '10:00';
    const end = '10:45';

    const startTime = start.toString().split(':');   // [10, 00]   split to array
    const endTime = end.toString().split(':');       // [10, 45]   split to array
    increment = parseInt(increment, 10);    // 15


    const pad = (n) => (n < 10) ? '0' + n.toString() : n;
    const startHr = parseInt(startTime[0], 10);      // 10  get start number
    const startMin = parseInt(startTime[1], 10);     // 0   get start number
    const endHr = parseInt(endTime[0], 10);          // 10   get end number

    const endMin = parseInt(endTime[1], 10);

    let currentHr = startHr;
    let currentMin = startMin;
    let previous = currentHr + ':' + pad(currentMin);    // first date -> 10:00

    let current = '';

    const r = [];


    do {
      currentMin += increment;

      if ((currentMin % 60) === 0 || currentMin > 60) {
        currentMin = (currentMin === 60) ? 0 : currentMin - 60;
        currentHr += 1;
      }

      current = currentHr + ':' + pad(currentMin);

      r.push(previous + ' - ' + current);
      console.log(current);
      // r.push(previous);
      previous = current;
      console.log(currentHr, endHr);
    } while (currentHr !== endHr);

    // r.push(current);
    // if ((endMin % 60 !== 0) || endMin > 60 ) {
    //   r.push(`${endHr}:${endMin}`);
    // }
    // endMin % 60 !== 0 && r.push(`${endHr}:${endMin}`);
    console.log(r);

    this.bookedTimes = r;*/
  }


  logic() {


    // const finish = this.allTimes.filter(arr1Item => !this.bookedTimes.includes(arr1Item));
    // console.log(finish);
  }



}










