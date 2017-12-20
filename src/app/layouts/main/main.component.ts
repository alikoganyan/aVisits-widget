import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {SwitcherService} from '../../services/switcher.service';
import {ActivatedRoute, Params} from '@angular/router';
import {SVariables} from '../../services/sVariables';
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

  steps_employee: string[];
  steps_service: string[];

  constructor(private switcherService: SwitcherService,
              private route: ActivatedRoute,
              private settingService: SettingService) {
  }

  onStart() {
    this.start = 'show';
    this.status = 'select_city';
  }


  getSettings() {
    if (SVariables.allowCheckMasterService) {
       this.settingService.sendSettings().subscribe(res => {
       console.log(res);
       if (res['data'].settings.w_let_check_steps === 1) {
         this.steps_employee = [];
         this.firstLetterAdder(res['data'].settings.w_steps_employee, 'm_', this.steps_employee, res['data'].settings);
         this.steps_service = [];
         this.firstLetterAdder(res['data'].settings.w_steps_service, 's_', this.steps_service, res['data'].settings);
         SVariables.steps_employee = this.steps_employee;
         SVariables.steps_service = this.steps_service;
         this.switcherSequenceMethod(res['data'].settings);
       }
     },
     (err: HttpErrorResponse) => {
       if (err.error instanceof Error) {
         console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
       } else {
         console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
       }
     });
    } else {
      this.settingService.sendSettingsByOneStep().subscribe(response => {
          console.log(response);
          this.steps_service = [];
          this.firstLetterAdder(response['data'].settings.w_steps_g, 's_', this.steps_service, response['data'].settings);
          SVariables.steps_service = this.steps_service;
          console.log(SVariables.steps_service);
        this.switcherSequenceMethod(response['data'].settings);
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message); // A client-side or network error occurred. Handle it accordingly.
          } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`); // The backend returned an unsuccessful response code.
          }
        });
    }


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
      if(params['steps_service']) {
        SVariables.settings = {
          steps_employee: params['steps_employee'].split(','),
          steps_service: params['steps_service'].split(','),
          color: '%23' + (params['color'].substring(1))
        };
        SVariables.allowCheckMasterService = true;
      } else {
        Styling.color = '%23' + (params['color'].substring(1));
        SVariables.allowCheckMasterService = false;
      }
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
    param.push('time_booked');
  }

  lightenDarkenColor(col, amt) {
    let usePound = false;
    if (col[0] == '#') {
      col = col.slice(1);
      usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  }

  globalWidgetsStyles(color: string, lightColor: string) {
    const selectStyle = {
      backgroundColor: lightColor,
      borderTop: '1px solid ' + color,
      borderBottom: '1px solid ' + color
    };

    const radioStyle = {
      backgroundColor: color,
      opacity: 1
    };

    const checkboxStyle = {
      before: {
        backgroundColor: color,
        border: '1px solid ' + color
      }
    };

    const wrappedStyle = {
      backgroundColor: lightColor,
      border: '1px solid ' + color
    };

    const fontColor = {
      color: color
    };

    const timeClass = {
      border: '1px solid ' + color,
      backgroundColor: lightColor,
      color: color
    };

    return {
      selectStyle,
      radioStyle,
      checkboxStyle,
      wrappedStyle,
      fontColor,
      timeClass
    };
  }



  switcherSequenceMethod(res) {
    this.switcherService.onSequence(SVariables.steps_service);  // default steps
    Styling.color = res.w_color;
    Styling.middleColor = this.lightenDarkenColor(res.w_color, 50);
    const lightColor = this.lightenDarkenColor(res.w_color, 99);
    Styling.lightColor = lightColor;
    Styling.globalWidgetsStyles = this.globalWidgetsStyles(res.w_color, lightColor);
    console.log(Styling.globalWidgetsStyles);
  }

}
