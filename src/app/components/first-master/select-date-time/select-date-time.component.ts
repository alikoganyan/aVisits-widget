import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {CityService} from '../../../services/city.service';

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


  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
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
    /*this.cityService.getTimes().subscribe(response => {
        this.timeLogic(response.data['employees']);
      },
      error => console.log(error));*/
  }


  timeLogic(param) {
    console.log(param);
    param.map((employee, index) => {
        if (employee.schedule !== null) {



          /* FOR ALL PERIODS */
          if (employee.schedule['periods'].length > 0) {

            employee.schedule.allPeriudsMinute = [];
            employee.schedule['periods'].map(period => {

              const interval = 30;
              const startTime = period.start.toString().split(':');
              const endTime = period.end.toString().split(':');
              const start = (+startTime[0]) * 60 + (+startTime[1]);
              const end = (+endTime[0]) * 60 + (+endTime[1]);


              let stHour = 0;
              let stMin: any = 0;
              let currentDate: any = 0;
              const times = [];


              for (let i = start; i <= end; i += interval) {
                employee.schedule.allPeriudsMinute.push(i);

                stHour = Math.floor(i / 60);
                stMin = i % 60 !== 0 ? i % 60 : (i % 60).toString() + '0';
                currentDate = `${stHour}:${stMin}`;
                times.push(currentDate);

              }
              console.log(times);
              end !== employee.schedule.allPeriudsMinute[employee.schedule.allPeriudsMinute.length - 1] && employee.schedule.allPeriudsMinute.push(end);
            });
            this.employeesServices[index].allPeriudsMinute = employee.schedule.allPeriudsMinute;
          } else {
            this.employeesServices[index].allPeriudsMinute = [];
          }


          /* ONLY FOR FREE PERIODS */
          if (employee.schedule['free_periods'].length > 0) {

            employee.schedule.allFree_PeriudsMinute = [];
            employee.schedule['free_periods'].map(free_period => {

              const interval = 30;
              const startTime = free_period.start.toString().split(':');
              const endTime = free_period.end.toString().split(':');
              const start = (+startTime[0]) * 60 + (+startTime[1]);
              const end = (+endTime[0]) * 60 + (+endTime[1]);


              let stHour = 0;
              let stMin: any = 0;
              let currentDate: any = 0;
              const times = [];


              for (let i = start; i <= end; i += interval) {
                employee.schedule.allFree_PeriudsMinute.push(i);



                stHour = Math.floor(i / 60);
                stMin = i % 60 !== 0 ? i % 60 : (i % 60).toString() + '0';
                currentDate = `${stHour}:${stMin}`;
                times.push(currentDate);


              }
              console.log('free');
              console.log(times);
              end !== employee.schedule.allFree_PeriudsMinute[employee.schedule.allFree_PeriudsMinute.length - 1] && employee.schedule.allFree_PeriudsMinute.push(end);
            });
            this.employeesServices[index].allFree_PeriudsMinute = employee.schedule.allFree_PeriudsMinute;
          } else {
            this.employeesServices[index].allFree_PeriudsMinute = [];
          }


          let beazyTimesMinut = employee.schedule.allPeriudsMinute.filter(arr1Item => !employee.schedule.allFree_PeriudsMinute.includes(arr1Item));
          beazyTimesMinut = beazyTimesMinut.sort((a, b) => a - b);
          console.log(beazyTimesMinut);



          const perLength = beazyTimesMinut.length / 2;   // half of all busy times
          console.log(beazyTimesMinut.length);
          console.log(perLength);
          const arr = [];
          let a;
          for (let i = 0; i <= perLength; ++i) {
            if (beazyTimesMinut.length > 0) {
              a = beazyTimesMinut.splice(0, perLength);
              arr.push(a);
            }
          }
          console.log(arr);


          arr.map((ar, arInd) => {


            const intervall = 15;
            let lastTime: any = 0;
            const stHour = arr[arInd][0];
            const stMin: any = arr[arInd][arr[arInd].length - 1];

            const temp = [];
            let isFreeTime = false;
            employee.schedule.allPeriudsMinute.map((time, ind) => {
              isFreeTime = true;
              lastTime = time;
              while (stHour <= lastTime && lastTime <= stMin) {
                lastTime += intervall;
                if (lastTime >= employee.schedule.allPeriudsMinute[ind + 1]) {
                  isFreeTime = false;
                  break;
                }
              }
              if (isFreeTime === true && temp.includes(lastTime) === false) {
                temp.push(lastTime);
              }
            });
            console.log(temp);


            const rest = employee.schedule.allFree_PeriudsMinute.filter(arr1Item => !temp.includes(arr1Item));

            // let beazyTimesMinut = employee.schedule.allPeriudsMinute.filter(arr1Item => !employee.schedule.allFree_PeriudsMinute.includes(arr1Item));
            // console.log(arr[arInd][0], arr[arInd][arr[arInd].length - 1]);
            console.log(rest);


          });


          /* if (employee.schedule['free_periods'].length > 0) {
             employee.schedule.free_dates = [];

             employee.schedule['free_periods'].map(free_period => {

               let increment: any = 15;
               const startTime = free_period.start.toString().split(':');
               const endTime = free_period.end.toString().split(':');
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
               employee.schedule.free_dates.push(r);
             });
             this.employeesServices[index].free_dates = employee.schedule.free_dates.reduce((a, b) => a.concat(b));
           } else {
             this.employeesServices[index].free_dates = [];
           } */
        }
      }
    );
  }


  ngOnInit() {
    this.getSubscriptions();
    this.getTimes();
    this.switcherService.changeCount(this.index);
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
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('select_date_time');
      this.sequence = sequence;
    });
    this.subEmployeesServices = this.switcherService.employeesServices.subscribe(employeesServices => {
      this.employeesServices = employeesServices;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
    this.subEmployeesServices.unsubscribe();
  }
}

