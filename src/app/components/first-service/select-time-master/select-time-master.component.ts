import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {Styling} from "../../../services/styling";

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

  constructor(private switcherService: SwitcherService,
              private navbarSwitcherService: NavbarSwitcherService) { }



  getStr(data) {
    // this.cityService.date = data;
    console.log(data);
    /*this.cityService.getTimes().subscribe(response => {
        this.timeLogic(response.data['employees']);
      },
      error => console.log(error));*/
  }

  ngOnInit() {
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

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

}
