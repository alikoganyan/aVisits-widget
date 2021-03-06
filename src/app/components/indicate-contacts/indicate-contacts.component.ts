import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {CityService} from '../../services/city.service';
import {NavbarSwitcherService} from '../../services/navbar-switcher.service';
import {SidebarSwitcherService} from '../../services/sidebar-switcher.service';
import {ClientService} from '../../services/client.service';
import {SVariables} from '../../services/sVariables';
import {Client} from '../../models/client';
import {Styling} from "../../services/styling";

@Component({
  selector: 'app-indicate-contacts',
  templateUrl: './indicate-contacts.component.html'
})
export class IndicateContactsComponent implements OnInit, OnDestroy {

  @ViewChild('f') contactForm: NgForm;

  mask: any[] = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  interrapt = false;
  subInterrupt: Subscription;

  sequence: string[];
  index: number;
  subSequence: Subscription;

  savedContacts: Client = {
    // comment: '',
    email: '',
    first_name: '',
    id: null,
    last_name: '',
    phone: '',
  };

  userFounded = false;


  inputsActive = {
    nameInput: false,
    phoneInput: false,
    emailInput: false,
    textareaInput: false
  };
  color = Styling.color;

  constructor(private switcherService: SwitcherService,
              private cityService: CityService,
              private navbarSwitcherService: NavbarSwitcherService,
              private sidebarSwitcherService: SidebarSwitcherService,
              private clientService: ClientService) {
  }


  ngOnInit() {
    this.getSubscriptions();
    this.navbarSwitcherService.changeCount(this.index);
  }

  getUserByPhone(event) {
    if (event.target.value.length === 18) {
      this.clientService.getClient(event.target.value).subscribe(response => {
        if (response['data'].client !== null) {
          this.savedContacts = response['data'].client;
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
    this.sidebarSwitcherService.userContact(new Client());
  }

  goNext() {
    this.onSubmit();
    if (this.userFounded === true) {
      this.clientService.updateClient(this.savedContacts).subscribe(response => {
          this.gotNextAssigned(response);
        },
        error => console.log('Something went wrong!'));
      this.userFounded = false;
    } else {
      this.clientService.newClient(this.contactForm.value).subscribe(response => {
          this.gotNextAssigned(response);
        },
        error => console.log('Something went wrong!'));
    }
  }

  gotNextAssigned(response) {
    SVariables.clientId = response['data'].client.id;
    this.savedContacts = response['data'].client;
    this.sidebarSwitcherService.userContact(this.savedContacts);
    this.switcherService.onClickedStatus(this.sequence[this.index + 1]);
  }

  onClose() {
    this.interrapt = true;
  }


  getSubscriptions() {
    this.subInterrupt = this.navbarSwitcherService.interrupt.subscribe(interrapt => {
      this.interrapt = interrapt;
    });
    this.subSequence = this.switcherService.sequence.subscribe(sequence => {
      this.index = sequence.indexOf('indicate_contacts');
      this.sequence = sequence;
    });
  }

  ngOnDestroy() {
    this.subInterrupt.unsubscribe();
    this.subSequence.unsubscribe();
  }

  /* STYLES FROM URL COLOR */

  fontColor() {
    return Styling.globalWidgetsStyles.fontColor;
  }

  radioStyle() {
    return Styling.globalWidgetsStyles.radioStyle;
  }

}
