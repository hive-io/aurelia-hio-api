import {CrudService} from './crud-service';
import {HttpClient} from 'aurelia-fetch-client';

class StoragePoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class StoragePoolService extends CrudService {
  constructor(httpClient) {
    super(httpClient, StoragePoolModel, { singular: 'storage/pool', plural: 'storage/pools' });
  }
}
