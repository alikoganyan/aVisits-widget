import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {CityService} from '../../services/city.service';


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
    id: null,
    phone: '',
    comment: '',
    email: '',
    first_name: '',
    last_name: '',
  };

  userFounded = false;


  constructor(private switcherService: SwitcherService,
              private cityService: CityService) {
  }


  ngOnInit() {
    this.getSubscriptions();
    this.switcherService.changeCount(this.index);
  }

  getUserByPhone(event) {
    if (event.target.value.length === 18) {
      this.cityService.getClient(event.target.value).subscribe(response => {
        if (response.data.client !== null) {
          this.savedContacts = response.data.client;
          console.log(response.data.client);
          this.userFounded = true;
        } else {
          this.savedContacts.comment = '';
          this.savedContacts.email = '';
          this.savedContacts.first_name = '';
          this.savedContacts.last_name = '';
          delete this.savedContacts.id;
          this.userFounded = false;
        }
      });
    }
  }

  onSubmit() {
    // console.log(this.contactForm.value, this.contactForm.valid);
  }

  goBack() {
    this.switcherService.onClickedStatus(this.sequence[this.index - 1]);
    this.switcherService.userContact({id: null, email: '', first_name: '', comment: '', phone: ''});
  }

  goNext() {
    this.onSubmit();
    let choose: string;
    this.chosenOrder === 'Master' ? choose = this.sequence[this.index + 1] : choose = 'select_services';
    if (this.userFounded === true) {
      this.cityService.updateClient(this.savedContacts).subscribe(response => {
          console.log(response.data.client);
          this.savedContacts = response.data.client;
          this.switcherService.userContact(this.savedContacts);
          this.switcherService.onClickedStatus(choose);
        },
        error => console.log(error));
      this.userFounded = false;
    } else {
      this.cityService.newClient(this.contactForm.value).subscribe(response => {
          this.savedContacts = response.data.client;
          this.switcherService.userContact(this.savedContacts);
          console.log(response.data.client);
          this.switcherService.onClickedStatus(choose);
        },
        error => console.log(error));
    }




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
