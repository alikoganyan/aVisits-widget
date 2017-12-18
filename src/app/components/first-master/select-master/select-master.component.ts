import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../../services/switcher.service';
import {Master} from '../../../models/master';
import {CityService} from '../../../services/city.service';
import {NavbarSwitcherService} from '../../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../../services/sidebar-switcher.service';
import {GetServicesService} from '../../../services/get-services.service';
import {GetDataService} from '../../../services/get-data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Styling} from "../../../services/styling";

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
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService,
              private getServicesService: GetServicesService,
              private getDataService: GetDataService) {
  }


  getEmployees() {
    this.getDataService.getEmployees().subscribe((response) => {
      this.loader = false;
      this.masters = response['data'].employees;
      console.log(response['data'].employees);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
        }
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
    this.navbarSwitcherService.changeCount(this.index);
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
    this.sidebarSwitcherService.selectMasters([]);
  }

  goNext() {
    const employees = [];
    this.selectedMasters.map((value) => {
      employees.push(value.id);
    });
    this.getServicesService.employees = employees;
    this.sidebarSwitcherService.selectMasters(this.selectedMasters);
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
  }

  onClose() {
    console.log(this.selectedMasters);
    this.interrapt = true;
  }


  getSubscriptions() {
    this.subInterrupt = this.navbarSwitcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('m_employee');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }


  wrappedStyle() {
    return Styling.wrappedStyle;
  }

  radioStyle() {
    return Styling.radioStyle;
  }

}




