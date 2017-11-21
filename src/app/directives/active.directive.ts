import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective {

  constructor() {
  }

  @HostBinding('class.active') isActive = false;

  @HostListener('click')
  toggleOpen() {
    this.isActive = !this.isActive;
  }

}
