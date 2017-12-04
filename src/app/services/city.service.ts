import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class CityService {

  apiUrl = 'http://api.avisits.com/api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  city: string;
  id: number;      // example v37
  salonId: number;
  employees: number[];


  constructor(private http: Http) {
  }

  getCities() {
    return this.http.get(this.apiUrl + 'widget/' + this.id + '/cities')
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }

  getCityLatLong() {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.city + '&callback=angular2GoogleMapsLazyMapsAPILoader&key=AIzaSyDBGVDv5fOFgfW4ixNZL_2krgkriGu6vvc&libraries=places')
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }


  getSalons() {
    return this.http.post(
      this.apiUrl + 'widget/' + this.id + '/salons_address',
      JSON.stringify({city: this.city}),
      {headers: this.headers}
    )
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }


  getEmployees() {
    return this.http.post(
      this.apiUrl + 'widget/' + this.id + '/employees',
      JSON.stringify({salon_id: this.salonId}),
      {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }


  getServices() {
    return this.http.post(
      this.apiUrl + 'widget/' + this.id + '/services',
      JSON.stringify(
        {
          salon_id: this.salonId,
          employees: this.employees
        }),
      {headers: this.headers}
    )
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }


  getTimes() {
    return this.http.post(
      'http://api.avisits.com/api/widget/' + this.id + '/times',
      JSON.stringify({
        salon_id: 3,
        employee_id: 2,
        date: '2018-12-02'
      }),
      {headers: this.headers}
    )
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }



}


