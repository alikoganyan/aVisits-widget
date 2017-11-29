import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {Master} from '../../../models/master';

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
  subMasters: Subscription;

  showSelectedMasterForMobile = false;



  constructor(private switcherService: SwitcherService) { }

  goToSelectedMaster(master: Master) {
    this.selectedMaster = master;
    this.showSelectedMasterForMobile = true;
    console.log(this.selectedMaster);
  }

  backToAllMasterOnMobile() {
    this.showSelectedMasterForMobile = false;
  }


  onSelectMaster(master: Master) {
    this.selectedMaster = master;
  }

  ngOnInit() {
  this.getSubscriptions();
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
    this.subMasters = this.switcherService.masters.subscribe(masters => {
      this.masters = masters;
      console.log(masters);
    });
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('select_services_master');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
    this.subMasters.unsubscribe();
  }

}

