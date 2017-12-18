import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SVariables} from '../../services/sVariables';
import {Setting} from '../../models/setting';
import {SettingService} from '../../services/setting.service';
import {Styling} from '../../services/styling';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {

  start = 'button';
  status = '';
  startSubscription: Subscription;
  statusSubscription: Subscription;
  subRoutId: Subscription;
  subSettings: Subscription;


  settings: Setting;


  color = '#EF7B4C';
  lightColor = '#FFF9F5';

  selectStyle = {
    backgroundColor: this.lightColor,
    borderTop: '1px solid' + this.color,
    borderBottom: '1px solid' + this.color
  };

  radioStyle = {
    backgroundColor: this.color,
    opacity: 1
  };

  checkboxStyle = {
    before: {
      backgroundColor: this.color,
      border: '1px solid' + this.color
    },
  };

  wrappedStyle = {
    backgroundColor: this.lightColor,
    border: '1px solid' + this.color
  };


  steps_employee: string[];
  steps_service: string[];

  constructor(private switcherService: SwitcherService,
              private route: ActivatedRoute,
              private settingService: SettingService) {
    Styling.selectStyle = this.selectStyle;
    Styling.radioStyle = this.radioStyle;
    Styling.color = this.color;
    Styling.lightColor = this.lightColor;
    Styling.checkboxStyle = this.checkboxStyle;
    Styling.wrappedStyle = this.wrappedStyle;
  }

  onStart() {
    this.start = 'show';
    this.status = 'select_city';
  }


  getSettings() {
    this.settingService.getSettings().subscribe(response => {
        console.log(response);
        this.settings = response['data'].settings;
        if (response['data'].settings.w_let_check_steps === 1) {
          this.steps_employee = [];
          this.firstLetterAdder(response['data'].settings.w_steps_employee, 'm_', this.steps_employee, response['data'].settings);
          this.steps_service = [];
          this.firstLetterAdder(response['data'].settings.w_steps_service, 's_', this.steps_service, response['data'].settings);


          SVariables.steps_employee = this.steps_employee;
          SVariables.steps_service = this.steps_service;
          console.log(SVariables.steps_employee);
          console.log(this.steps_service);

          this.settingService.sendSettings().subscribe(res => {
            // console.log(res);
              this.settings = res['data'].settings;
              this.steps_employee = [];
              this.firstLetterAdder(res['data'].settings.w_steps_employee, 'm_', this.steps_employee, response['data'].settings);
              this.steps_service = [];
              this.firstLetterAdder(res['data'].settings.w_steps_service, 's_', this.steps_service, response['data'].settings);
              SVariables.steps_employee = this.steps_employee;
              SVariables.steps_service = this.steps_service;
              this.switcherService.onSequence(SVariables.steps_employee);
              console.log(SVariables.steps_employee);
              console.log(this.steps_service);
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
              } else {
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
              }
            });
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
        }
      });
  }

  ngOnInit() {
    this.getSubscriptions();
    this.getSettings();

  }

  getSubscriptions() {
    this.startSubscription = this.switcherService.clickedStart.subscribe((start: string) => {
      this.start = start;
    });
    this.statusSubscription = this.switcherService.status.subscribe((status: string) => {
      this.status = status;
    });
    this.subRoutId = this.route.params.subscribe((params: Params) => {
      const id = params['widget'];
      SVariables.chainId = +id.substr(1);
    });
    this.subSettings = this.route.queryParams.subscribe((params) => {
      const setting = {
        steps_employee: params['steps_employee'].split(','),
        steps_service: params['steps_service'].split(','),
        color: params['color']
      };
      SVariables.settings = setting;
      console.log(SVariables.settings);
    });
  }


  ngOnDestroy() {
    this.startSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
    this.subRoutId.unsubscribe();
    this.subSettings.unsubscribe();
  }


  firstLetterAdder(arr, lt, param, settings) {
    arr.map(v => {
      if (v !== 'address') {
        v = lt + v;
      }
      param.push(v);
    });
    if (settings.w_contact_step === 'at_the_end') {
      param.push('indicate_contacts');
    }
    else if (settings.w_contact_step === 'at_first') {
      param.unshift('indicate_contacts');
    }
    else if (settings.w_contact_step === 'after_address') {
      const index = param.indexOf('address');
      param.splice(index + 1, 0, 'indicate_contacts').join();
    }
    param.unshift('select_city');
    param.push('time_booked')
  }

  getLighterColor() {
    // ["m_employee", "m_service", "address", "m_time", "indicate_contacts"]
    // ["address", "s_service", "s_employee_time", "indicate_contacts"]
  }

}
