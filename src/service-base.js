import {baseUrl} from './constants';
import 'isomorphic-fetch';

export class ServiceBase {
  constructor(httpClient) {
    if (httpClient.baseUrl === '') {
      httpClient.baseUrl = baseUrl() + '/api/';
    }

    this.http = httpClient;
  }
}
