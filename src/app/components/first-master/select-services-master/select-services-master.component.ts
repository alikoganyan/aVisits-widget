import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwitcherService} from '../../../services/switcher.service';
import {Master} from '../../../models/master';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-select-services-master',
  templateUrl: './select-services-master.component.html'
})
export class SelectServicesMasterComponent implements OnInit, OnDestroy {

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  index: number;
  subSequence: Subscription;

  masters: Master[] = [];
  selectedMaster: Master;




  constructor(private switcherService: SwitcherService) { }


  onSelectMaster(master: Master) {
    this.selectedMaster = master;
  }

  ngOnInit() {
    this.switcherService.changeCount(4);
    this.switcherService.masters.subscribe(masters => {
      this.masters = masters;
    });
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('select_services_master');
      this.sequence = sequence;
    });
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

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }

}

