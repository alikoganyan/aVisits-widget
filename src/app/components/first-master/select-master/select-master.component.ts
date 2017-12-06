import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {Master} from '../../../models/master';
import {CityService} from '../../../services/city.service';

@Component({
  selector: 'app-select-master',
  templateUrl: './select-master.component.html'
})
export class SelectMasterComponent implements OnInit, OnDestroy {

  loader = true;

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  subSequence: Subscription;
  index: number;


  selectedMasters: Master[] = [];
  masters: Master[] = [];


  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }


  getEmployees() {
    this.cityService.getEmployees().subscribe((response) => {
      this.loader = false;
      this.masters = response.data.employees;
      console.log(response.data.employees);
    });
  }

  onSelectMaster(master: Master) {
    let checked = null;
    for (const m in this.selectedMasters) {
      if (this.selectedMasters[m].id === master.id) {
        checked = m;  // index (5) or (3)
        break;
      }
    }
    if (checked !== null) {
      this.selectedMasters.splice(checked, 1);
      checked = null;
    } else {
      this.selectedMasters.push(master);
    }
  }


  isActive(master: Master) {
    let exist = false;
    for (const m of this.selectedMasters) {
      if (m.id === master.id) {
        exist = true;
        break;
      }
    }
    return exist;
  }


  ngOnInit() {
    this.getEmployees();
    this.getSubscriptions();
    this.switcherService.changeCount(this.index);
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
    this.switcherService.selectMasters([]);
  }

  goNext() {
    const employees = [];
    this.selectedMasters.map((value) => {
      employees.push(value.id);
    });
    console.log(employees);
    this.cityService.employees = employees;
    this.switcherService.selectMasters(this.selectedMasters);
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
  }

  onClose() {
    console.log(this.selectedMasters);
    this.interrapt = true;
  }


  getSubscriptions() {
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('select_master');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }

}




