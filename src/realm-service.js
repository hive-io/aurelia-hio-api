import {CrudService} from './crud-service';
import {HttpClient} from 'aurelia-fetch-client';

class RealmModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class RealmService extends CrudService {
  constructor(httpClient) {
    super(httpClient, RealmModel, { singular: 'realm', plural: 'realms' });
  }
}
