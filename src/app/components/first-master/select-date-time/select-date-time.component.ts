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

  employeesServices = [];
  subEmployeesServices: Subscription;


  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }


  getTimes() {
    this.cityService.getTimes().subscribe(response => {
        response.data['employees'].map((employee, index) => {
          employee.schedule.dates = [];
          employee.schedule['periods'].map(period => {

            let increment: any = 15;
            const startTime = period.start.toString().split(':');
            const endTime = period.end.toString().split(':');
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
            employee.schedule.dates.push(r);
          });
          this.employeesServices[index].dates = employee.schedule.dates.reduce((a, b) => a.concat(b));
        });
      },
      error => console.log(error));
    console.log(this.employeesServices);
  }

  getStr(data) {
    this.cityService.date = data;
    this.cityService.getTimes();
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

