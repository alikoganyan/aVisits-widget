import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {Styling} from '../../../services/styling';
import {GetDataService} from '../../../services/get-data.service';
import {SDate} from '../../../models/date';
import * as moment from 'moment';
import {SVariables} from '../../../services/sVariables';

@Component({
  selector: 'app-select-time-master',
  templateUrl: './select-time-master.component.html'
})
export class SelectTimeMasterComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  subSequence: Subscription;
  index: number;

  date: SDate = {
    day: moment(new Date()).add(0, 'days').format('DD'),
    weekday: moment(new Date()).locale('ru').add(0, 'days').format('dddd'),
    month: moment(new Date()).locale('ru').add(0, 'days').format('MMMM').charAt(0).toUpperCase() +
    moment(new Date()).locale('ru').add(0, 'days').format('MMMM').slice(1),
    year: moment(new Date()).locale('ru').add(0, 'days').format('Y'),
    working_status: null
  };

  employeesAndTimes: any;

  constructor(private switcherService: SwitcherService,
              private navbarSwitcherService: NavbarSwitcherService,
              private getDataService: GetDataService) {
  }


  getEmployeesAndTimes() {
    this.getDataService.getEmployeesAndTimes().subscribe(response => {
      console.log(response['data']);
      this.employeesAndTimes = response['data'];
    },
      error => console.log('Something went wrong!'));
  }


  getSelectedDate(date: SDate) {
    SVariables.date = `${date.year}-${moment().locale('ru').month(date.month).format('MM')}-${date.day}`;
    console.log(SVariables.date);
    // this.getDataService.getTimes().subscribe(response => {
    //
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
    //     } else {
    //       console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
    //     }
    //   });
  }

  ngOnInit() {
    this.getEmployeesAndTimes();
    this.getSubscriptions();
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
      this.index = sequence.indexOf('s_employee_time');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
  }


  /* STYLES FROM URL COLOR */

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

}
