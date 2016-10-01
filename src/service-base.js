import {HttpClient} from 'aurelia-fetch-client';
import {baseUrl} from './constants';
import 'isomorphic-fetch';

export class ServiceBase {
  constructor() {
    this.http = new HttpClient()
      .configure(config => {
        config
          .useStandardConfiguration()
          .withBaseUrl(baseUrl() + '/api/');
      });
  }
}
