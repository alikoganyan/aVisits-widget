import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SVariables} from './sVariables';
import {Client} from '../models/client';

@Injectable()
export class ClientService {
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) {
  }

  getClient(phone: string) {
    return this.http.get(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/client/' + phone);
  }

  updateClient(client: Client) {
    return this.http.put(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/client/' + client.id,
      client,
      {headers: this.headers}
    );
  }

  newClient(client: Client) {
    return this.http.post(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/client',
      client,
      {headers: this.headers}
    );
  }

}
