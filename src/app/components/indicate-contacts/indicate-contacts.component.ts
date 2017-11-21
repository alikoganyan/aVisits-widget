import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';

@Component({
  selector: 'app-indicate-contacts',
  templateUrl: './indicate-contacts.component.html',
  styleUrls: ['./indicate-contacts.component.scss']
})
export class IndicateContactsComponent implements OnInit, OnDestroy {

  @ViewChild('f') contactForm: NgForm;

  chosenOrder: string;

  mask: any[] = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  subChosenOrder: Subscription;


  constructor(private switcherService: SwitcherService) {
  }

  ngOnInit() {
    this.subChosenOrder = this.switcherService.currentMessage.subscribe(message => {
      this.chosenOrder = message;
    });
    this.switcherService.changeCount(2);
  }

  onSubmit() {
    // console.log(this.contactForm.value, this.contactForm.valid);
  }

  goBack(selectCity: string) {
    this.switcherService.clickedStatus.next(selectCity);
  }

  goNext() {
    this.onSubmit();
    this.switcherService.userContact(this.contactForm.value);
    let choose: string;
    this.chosenOrder === 'Master' ? choose = 'select-master' : choose = 'select-services';
    this.switcherService.clickedStatus.next(choose);
  }

  onClose(hide: string, status: string) {
    this.switcherService.clickedStart.next(hide);
    this.switcherService.clickedStatus.next(status);
  }

  ngOnDestroy() {
    this.subChosenOrder.unsubscribe();
  }

}
