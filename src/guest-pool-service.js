import {CrudService} from './crud-service';
import {HttpClient} from 'aurelia-fetch-client';

class GuestPoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class GuestPoolService extends CrudService {
  constructor(httpClient) {
    super(httpClient, GuestPoolModel, { singular: 'pool', plural: 'pools' });
  }
}
