import { CrudService } from './crud-service';
import { json } from 'aurelia-fetch-client';

let ExchangeModel = class ExchangeModel {
  constructor(data, http) {
    Object.assign(this, data);
    this.http = http;
  }

  publish(message) {
    return this.http.fetch('bus/exchange/' + this.name, {
      method: 'POST', body: json(message)
    });
  }
};


export let ExchangeService = class ExchangeService extends CrudService {
  constructor() {
    super(ExchangeModel, { singular: 'bus/exchange', plural: 'bus/exchange' });
  }
};