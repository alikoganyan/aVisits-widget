import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {Master} from '../../../models/master';
import {CityService} from '../../../services/city.service';

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

  firstMaster: Master = new Master();
  only_first_masterServices = 'show';

  employeeServices = [];

  showSelectedMasterForMobile = false;

  totalCount = 0;
  totalPrice = 0;

  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }

  onSelectService(service, event) {
    service.checked = event.target.checked;
    event.target.checked ? this.totalCount++ : this.totalCount--;

    if (event.target.checked) {
      this.totalPrice = this.totalPrice + parseInt(service.price);
    } else {
      this.totalPrice = this.totalPrice - parseInt(service.price);
    }
    console.log(this.totalPrice);
  }

  getServices() {
    this.cityService.getServices().subscribe(response => {

      response.data.employees.map((value) => {

        this.firstMaster = response.data.employees[0];  // dis is for show first master services

        value.service_groups.map((v) => {
          v.services.map((s) => {
            const oneHour = 60;
            const min = s.duration / oneHour;
            const hour = Math.floor(min);
            const count2 = min - hour;
            const minute = count2 * oneHour;
            s.hour = hour;
            s.min = Math.floor(minute);
            s.checked = false;
          });
        });
      });
      this.employeeServices = response.data.employees;
    });

  }


  onSelectMaster(master: Master) {
    this.selectedMaster = master;
    this.only_first_masterServices = 'hide';
  }


  /* FOR MOBILE VERSION */
  goToSelectedMaster(master: Master) {
    this.selectedMaster = master;
    this.showSelectedMasterForMobile = true;
  }

  /* FOR MOBILE VERSION */
  backToAllMasterOnMobile() {
    this.showSelectedMasterForMobile = false;
  }


  ngOnInit() {
    this.getSubscriptions();
    this.getServices();
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

