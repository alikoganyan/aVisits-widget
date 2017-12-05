import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {CityService} from "../../services/city.service";

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

  sequence: string[];
  index: number;
  subSequence: Subscription;

  savedContacts = {
    phone: '',
    textArea: '',
    email: '',
    nameUser: '',
  };

  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }



  ngOnInit() {
    this.getSubscriptions();
    this.switcherService.changeCount(this.index);
  }

  onSubmit() {
    // console.log(this.contactForm.value, this.contactForm.valid);
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
    this.switcherService.userContact({email: '', first_name: '', comment: '', phone: ''});
  }

  goNext() {
    this.onSubmit();
    this.switcherService.userContact(this.contactForm.value);
    this.cityService.newClient(this.contactForm.value);
    let choose: string;
    this.chosenOrder === 'Master' ? choose = this.sequence[this.index + 1] : choose = 'select_services';
    this.switcherService.onClickedStatus(choose);
  }

  onClose() {
    this.interrapt = true;
  }


  getSubscriptions() {
    this.subChosenOrder = this.switcherService.currentMessage.subscribe(message => {
      this.chosenOrder = message;
    });
    this.subInterrupt = this.switcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('indicate_contacts');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subChosenOrder.unsubscribe();
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }

}
