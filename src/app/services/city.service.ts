/*import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CityService {
  apiUrl = 'http://api.avisits.com/api/';

  constructor(private http: HttpClient) {}

  getCities() {
   return this.http.get<string[]>(this.apiUrl + 'widget/37/cities');
  }
}*/

import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CityService {
  apiUrl = 'http://api.avisits.com/api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getCities() {
    return this.http.get(this.apiUrl + 'widget/37/cities')
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }


  getSalons(city: string) {
    this.http.post(this.apiUrl + 'sd', {city: city}, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }

}


