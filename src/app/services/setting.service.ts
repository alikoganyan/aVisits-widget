import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SVariables} from "./sVariables";

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


}
