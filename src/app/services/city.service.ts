import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {SVariables} from './sVariables';


@Injectable()
export class CityService {

  private headers = new Headers({'Content-Type': 'application/json'});
  employees: number[];
  employeesID: number[];


  constructor(private http: Http) {
  }

  getCities() {
    return this.http.get(SVariables.apiUrl + 'widget/' + SVariables.chainId + '/cities')
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }

  getCityLatLong() {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
      SVariables.city + '&callback=angular2GoogleMapsLazyMapsAPILoader&key=' +
      'AIzaSyDBGVDv5fOFgfW4ixNZL_2krgkriGu6vvc&libraries=places')
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
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/salons_address',
      JSON.stringify({city: SVariables.city}),
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
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/employees',
      JSON.stringify({salon_id: SVariables.salonId}),
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


  getServices() {
    return this.http.post(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/services',
      JSON.stringify(
        {
          salon_id: SVariables.salonId,
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


  getAllServices() {
    return this.http.post(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/services',
      JSON.stringify(
        {
          salon_id: SVariables.salonId
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
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/times',
      JSON.stringify({
        salon_id: SVariables.salonId,
        employees: this.employeesID,
        date: SVariables.date
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


  newClient(client) {
    return this.http.post(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/client',
      JSON.stringify(client),
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


  getClient(phone: string) {
    return this.http.get(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/client/' + phone)
      .map((response: Response) => {
        return response.json();
      })
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        });
  }

  updateClient(client) {
    return this.http.put(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/client/' + client.id,
      JSON.stringify(client),
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



