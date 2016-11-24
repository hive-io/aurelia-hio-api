import {CrudService} from './crud-service';
import {HttpClient, json} from 'aurelia-fetch-client';

class ExchangeModel {
  constructor(data, http) {
    Object.assign(this, data);
    this.http = http;
  }

  publish(message) {
    return this.http.fetch('bus/exchange/' + this.name, {
      method: 'POST', body: json(message)
    });
  }
}

@inject(HttpClient)
export class ExchangeService extends CrudService {
  constructor(httpClient) {
    super(httpClient, ExchangeModel, { singular: 'bus/exchange', plural: 'bus/exchange' });
  }
}
