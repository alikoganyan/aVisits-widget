import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {SwitcherService} from '../../../services/switcher.service';
import {Master} from '../../../models/master';
import {CityService} from '../../../services/city.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../../services/sidebar-switcher.service';
import {SVariables} from '../../../services/sVariables';
import {GetServicesService} from '../../../services/get-services.service';
import {GetDataService} from '../../../services/get-data.service';
import {Styling} from '../../../services/styling';

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

  color = Styling.color;
  searchInput = false;

  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService,
              private getServicesService: GetServicesService,
              private getDataService: GetDataService) {
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
      this.priceAndCount.totalPrice = this.priceAndCount.totalPrice + parseInt(service.price, 10);
    } else {
      if (typeof this.selectedMaster !== 'undefined') {
        this.selectedMaster.id === employeeService.employee_id && this.selectedMaster.count--;
      } else {
        this.masters[0].id === employeeService.employee_id && this.masters[0].count--; // this is for first master services
      }
      this.priceAndCount.totalCount--;
      this.priceAndCount.totalPrice = this.priceAndCount.totalPrice - parseInt(service.price, 10);
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
              if (s.id === service.id) {
                checked = i;
              }
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
      }
    });

  }

  getServices() {
    this.getServicesService.getEmployeeServices().subscribe(response => {
      console.log(response);

      if(response['data'].constructor !== Array) {
        response['data'].employees.map((employee) => {
          this.firstMaster = response['data'].employees[0];  // this is for show first master services
          employee.service_groups.map((group) => {
            group.services.map((service) => {
              const hour = Math.floor(service.duration / 60);
              const min = service.duration % 60;
              service.hour = hour;
              service.min = Math.floor(min);
              service.checked = false;
            });
          });
        });
        this.employeeServices = response['data'].employees;
      }
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
    this.navbarSwitcherService.changeCount(this.index);
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
    this.sidebarSwitcherService.getPriceAndCount({totalCount: 0, totalPrice: 0});
  }

  goNext() {
    const year = `${moment(new Date()).locale('ru').add(0, 'days').format('Y')}`;
    const month = `${moment(new Date()).locale('ru').add(0, 'days').format('M')}`;
    const day = `${moment(new Date()).add(0, 'days').get('date')}`;
    const date = `${year}-${month}-${day}`;
    const employeesTimes: {employee_id: number, services: number[]}[] = [];
    const employeesID: number[] = [];

    this.selectedDates.map((mId, ind) => {
      mId.selectedTime = 0;
      employeesTimes.push({employee_id: mId.id, services: []});
      employeesID.push(mId.id);
      mId.employeeServices.map(v => {
        mId.selectedTime += v.duration;
        employeesTimes[ind].services.push(v.id);
      });
    });
    SVariables.date = date;
    this.getDataService.employeesTimes = employeesTimes;
    this.getDataService.employeesID = employeesID;
    this.sidebarSwitcherService.getSelectedEmployeesServices(this.selectedDates);
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
    this.sidebarSwitcherService.getPriceAndCount(this.priceAndCount);
  }

  onClose() {
    this.interrapt = true;
  }

  getSubscriptions() {
    this.subMasters = this.sidebarSwitcherService.masters.subscribe(masters => {
      masters.map(value => value.count = 0);
      this.masters = masters;
    });
    this.subInterrupt = this.navbarSwitcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('m_service');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
    this.subMasters.unsubscribe();
  }


  /* STYLES FROM URL COLOR */
  backColor() {
    return {backgroundColor: Styling.lightColor};
  }

  selectStyle() {
    return Styling.globalWidgetsStyles.selectStyle;
  }

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

}

