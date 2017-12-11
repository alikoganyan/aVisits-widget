import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NavbarSwitcherService {


  private count = new BehaviorSubject(1);  // count for adding active class navbar
  active = this.count.asObservable();


  private interruptStatus = new BehaviorSubject(false); // show hide interrupt components
  interrupt = this.interruptStatus.asObservable();


  constructor() { }


  changeCount(count: number) {
    this.count.next(count);
  }

  changeInterruptStatus(interrupt: boolean) {   // show hide interrupt components
    this.interruptStatus.next(interrupt);
  }


}
