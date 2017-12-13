import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SVariables} from './sVariables';
import {Appointment} from '../models/appointment';

@Injectable()
export class AppointmentService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) {
  }

  createAppointment(appointment: Appointment[]) {
    return this.http.post(`${SVariables.apiUrl}widget/${SVariables.chainId}/appointment`,
      appointment,
      {headers: this.headers});
  }

}

