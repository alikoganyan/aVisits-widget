import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SVariables} from "./sVariables";
import {Styling} from './styling';

@Injectable()
export class SettingService {

  constructor(private http: HttpClient) {
  }

  sendSettings() {
    return this.http.get(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/settings?' +
      'w_steps_employee=' + SVariables.settings.steps_employee + '&' +
      'w_steps_service=' + SVariables.settings.steps_service + '&' +
      'w_color=' + SVariables.settings.color);
  }


  sendSettingsByOneStep() {
    return this.http.get('http://api.avisits.com/api/widget/' + SVariables.chainId + '/settings?w_color=' + Styling.color);
  }

}
