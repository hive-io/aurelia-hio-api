import {CrudService} from './crud-service';
import {HttpClient} from 'aurelia-fetch-client';

class UserModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class UserService extends CrudService {
  constructor(httpClient) {
    super(httpClient, UserModel, { singular: 'user', plural: 'users' });
  }
}
