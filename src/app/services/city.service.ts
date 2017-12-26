import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SVariables} from './sVariables';

@Injectable()
export class CityService {

  constructor(private http: HttpClient) {
  }

  getCities() {
    return this.http.get(SVariables.apiUrl + 'widget/' + SVariables.chainId + '/cities');
  }

  getCityLatLong() {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
      SVariables.city + '&callback=angular2GoogleMapsLazyMapsAPILoader&key=' +
      'AIzaSyDBGVDv5fOFgfW4ixNZL_2krgkriGu6vvc&libraries=places');
  }
}



