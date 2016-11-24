import {CrudService} from './crud-service';
import {HttpClient} from 'aurelia-fetch-client';

class QueueModel {
  constructor(data, http) {
    Object.assign(this, data);
    this.http = http;
  }
}

@inject(HttpClient)
export class QueueService extends CrudService {
  constructor(httpClient) {
    super(httpClient, QueueModel, { singular: 'bus/queue', plural: 'bus/queue' });
  }
}
