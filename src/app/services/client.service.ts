import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SVariables} from './sVariables';
import {Client} from '../models/client';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) {
  }

  getClient(phone: string) {
    return this.http.get(
      SVariables.apiUrl + 'widget/' + SVariables.chainId + '/client/' + phone);
  }


}
