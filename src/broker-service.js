import {CrudService} from './crud-service';
import {HttpClient} from 'aurelia-fetch-client';

class BrokerModel {
  constructor(data) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class BrokerService extends CrudService {
  constructor(httpClient) {
    super(httpClient, BrokerModel, { singular: 'bus', plural: 'bus' });
  }
}
