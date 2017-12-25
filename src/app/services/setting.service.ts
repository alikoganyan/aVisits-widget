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
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/settings?' + SVariables.settingsUrl);
  }

  sendSettingsByOneStep() {
    return this.http.get('http://api.avisits.com/api/widget/' + SVariables.chainId + '/settings?w_color=' + Styling.color);
  }

}
