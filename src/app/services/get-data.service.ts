import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SVariables} from './sVariables';

@Injectable()
export class GetDataService {
  employeesID: number[];
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) {
  }


  getSalons() {
    return this.http.post(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/salons_address',
      {city: SVariables.city},
      {headers: this.headers}
    );
  }

  getTimes() {
    return this.http.post(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/times',
      {
        salon_id: SVariables.salonId,
        employees: this.employeesID,
        date: SVariables.date
      },
      {headers: this.headers}
    );
  }


  getEmployeeCalendar(from: string, to: string) {
    return this.http.post<{ data: ECalendar[] }>(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/employee_calendar',
      {
        salon_id: SVariables.salonId,
        employees: this.employeesID,
        from: from,
        to: to
      },
      {headers: this.headers}
    );
  }


  getEmployees() {
    return this.http.post(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/employees',
      {salon_id: SVariables.salonId},
      {headers: this.headers}
    );
  }



}

interface ECalendar {
  date: string;
  working_status: number;
}
