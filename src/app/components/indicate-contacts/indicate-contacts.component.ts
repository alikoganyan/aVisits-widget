import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';

@Component({
  selector: 'app-indicate-contacts',
  templateUrl: './indicate-contacts.component.html'
})
export class IndicateContactsComponent implements OnInit, OnDestroy {

  @ViewChild('f') contactForm: NgForm;

  mask: any[] = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  chosenOrder: string;
  subChosenOrder: Subscription;

  interrapt = false;
  subInterrupt: Subscription;

  constructor(private switcherService: SwitcherService) {
  }

  ngOnInit() {
    this.subChosenOrder = this.switcherService.currentMessage.subscribe(message => {
      this.chosenOrder = message;
    });
    this.switcherService.changeCount(2);
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
  }

  onSubmit() {
    // console.log(this.contactForm.value, this.contactForm.valid);
  }

  goBack(selectCity: string) {
    this.switcherService.onClickedStatus(selectCity);
    this.switcherService.userContact({ email: '', name: '', notes: '', tel: '' });
  }

  goNext() {
    this.onSubmit();
    this.switcherService.userContact(this.contactForm.value);
    let choose: string;
    this.chosenOrder === 'Master' ? choose = 'select-master' : choose = 'select-services';
    this.switcherService.onClickedStatus(choose);
  }

  onClose() {
    this.interrapt = true;
  }

  ngOnDestroy() {
    this.subChosenOrder.unsubscribe();
    this.subInterrupt.unsubscribe();
  }

}
