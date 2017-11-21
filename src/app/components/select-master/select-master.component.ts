import {Component, OnInit} from '@angular/core';
import {SwitcherService} from '../../services/switcher.service';
import {Master} from '../../models/master';

@Component({
  selector: 'app-select-master',
  templateUrl: './select-master.component.html',
  styleUrls: ['./select-master.component.scss']
})
export class SelectMasterComponent implements OnInit {

  selectedMasters: Master[] = [];
  masters: Master[] = [
    {
      id: 1,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 1',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 2,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 2',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 3,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 3',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 4,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 4',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 5,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 5',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 6,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 6',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 7,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 7',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 8,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 8',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 9,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 9',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 10,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 10',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 11,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 11',
      profession: 'Парикмахер-стилист'
    },
    {
      id: 12,
      image: 'assets/images/icons/master-checked-icon.png',
      name: 'Сергеева Анна 12',
      profession: 'Парикмахер-стилист'
    }
  ];


  constructor(private switcherService: SwitcherService) {
  }

  onSelectMaster(master: Master) {
    let checked = null;
    for (const m in this.selectedMasters) {
      if (this.selectedMasters[m].id === master.id) {
        checked = m;
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

  ngOnInit() {
    this.switcherService.changeCount(3);
  }

  goBack(selectCity: string) {
    this.switcherService.clickedStatus.next(selectCity);
  }

  goNext(enterContact: string) {
    this.switcherService.clickedStatus.next(enterContact);
  }

  onClose(hide: string, status: string) {
    this.switcherService.clickedStart.next(hide);
    this.switcherService.clickedStatus.next(status);
  }

}
