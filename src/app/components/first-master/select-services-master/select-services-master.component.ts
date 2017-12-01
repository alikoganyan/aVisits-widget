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

  searchText = '';

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  index: number;
  subSequence: Subscription;

  masters: Master[] = [];
  selectedMaster: Master;
  subMasters: Subscription;

  firstMaster: Master = new Master();  // type mas correct
  only_first_masterServices = 'show';

  employeeServices = [];

  showSelectedMasterForMobile = false;

  totalCount = 0;
  totalPrice = 0;

  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }

  onSelectService(service, event, employeeService) {
    service.checked = event.target.checked;
    if (event.target.checked) {
      if (typeof this.selectedMaster !== 'undefined') {
        this.selectedMaster.id === employeeService.employee_id && this.selectedMaster.count++;
      } else {
        this.masters[0].id === employeeService.employee_id && this.masters[0].count++; // dis is for first master services
      }
      this.totalCount++;
      this.totalPrice = this.totalPrice + parseInt(service.price);
    } else {
      if (typeof this.selectedMaster !== 'undefined') {
        this.selectedMaster.id === employeeService.employee_id && this.selectedMaster.count--;
      } else {
        this.masters[0].id === employeeService.employee_id && this.masters[0].count--; // dis is for first master services
      }
      this.totalCount--;
      this.totalPrice = this.totalPrice - parseInt(service.price);
    }
  }

  getServices() {
    this.cityService.getServices().subscribe(response => {

      response.data.employees.map((employee) => {

        this.firstMaster = response.data.employees[0];  // dis is for show first master services

        employee.service_groups.map((group) => {
          group.services.map((service) => {
            const oneHour = 60;
            const min = service.duration / oneHour;
            const hour = Math.floor(min);
            const count2 = min - hour;
            const minute = count2 * oneHour;
            service.hour = hour;
            service.min = Math.floor(minute);
            service.checked = false;
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
      masters.map(value => value.count = 0);
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

