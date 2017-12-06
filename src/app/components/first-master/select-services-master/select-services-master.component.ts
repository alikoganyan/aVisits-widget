import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
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

  priceAndCount = {
    totalCount: 0,
    totalPrice: 0
  };

  selectedDates = [];

  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }

  onSelectService(service, event, employeeService) {

    service.checked = event.target.checked;
    if (event.target.checked) {
      if (typeof this.selectedMaster !== 'undefined') {
        this.selectedMaster.id === employeeService.employee_id && this.selectedMaster.count++;
      } else {
        this.masters[0].id === employeeService.employee_id && this.masters[0].count++; // this is for first master services
      }
      this.priceAndCount.totalCount++;
      this.priceAndCount.totalPrice = this.priceAndCount.totalPrice + parseInt(service.price);
    } else {
      if (typeof this.selectedMaster !== 'undefined') {
        this.selectedMaster.id === employeeService.employee_id && this.selectedMaster.count--;
      } else {
        this.masters[0].id === employeeService.employee_id && this.masters[0].count--; // this is for first master services
      }
      this.priceAndCount.totalCount--;
      this.priceAndCount.totalPrice = this.priceAndCount.totalPrice - parseInt(service.price);
    }

    let checked = null;
    this.masters.map((master) => {
      if (employeeService.employee_id === master.id) {
        if (!this.selectedDates.includes(master)) {
          master.employeeServices = [];
          this.selectedDates.push(master);
        }
        if (event.target.checked) {
          master.employeeServices.push(service);
        } else {
          this.selectedDates.map((m, ind) => {
            m.employeeServices.map((s, i) => {
              if (s.id === service.id) checked = i;
            });
            if (checked !== null) {
              master.employeeServices.splice(checked, 1);
              checked = null;
            }
            if (m.employeeServices.length === 0) {
              this.selectedDates.splice(ind, 1);
            }
          });
        }
        console.log(this.selectedDates);
      }
    });

  }

  getServices() {
    this.cityService.getServices().subscribe(response => {
      console.log(response);
      response.data.employees.map((employee) => {
        this.firstMaster = response.data.employees[0];  // this is for show first master services
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
    this.showSelectedMasterForMobile = true;
    this.selectedMaster = master;
    this.only_first_masterServices = 'hide';
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
    this.switcherService.getPriceAndCount({totalCount: 0, totalPrice: 0});
  }

  goNext() {
    console.log(this.employeeServices);
    const employeesID: number[] = [];
    this.selectedDates.map(mId => {
      employeesID.push(mId.id);
    });
    const year = `${moment(new Date()).locale('ru').add(0, 'days').format('Y')}`;
    const month = `${moment(new Date()).locale('ru').add(0, 'days').format('M')}`;
    const day = `${moment(new Date()).add(0, 'days').get('date')}`;
    const date = `${year}-${month}-${day}`;
    this.cityService.date = date;
    this.cityService.employeesID = employeesID;
    this.switcherService.getSelectedEmployeesServices(this.selectedDates);
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
    this.switcherService.getPriceAndCount(this.priceAndCount);
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

