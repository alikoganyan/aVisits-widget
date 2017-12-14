import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SVariables} from './sVariables';

@Injectable()
export class GetServicesService {

  employees: number[];
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) {
  }

  getEmployeeServices() {
    return this.http.post(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/services',
      {
        salon_id: SVariables.salonId,
        employees: this.employees
      },
      {headers: this.headers}
    );
  }

  getAllServices() {
    return this.http.post(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/services',
        {
          salon_id: SVariables.salonId
        },
      {headers: this.headers}
    );
  }



}
