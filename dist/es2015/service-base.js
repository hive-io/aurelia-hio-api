import { HttpClient } from 'aurelia-fetch-client';
import * as c from './constants';
import 'isomorphic-fetch';

export let ServiceBase = class ServiceBase {
  constructor() {
    this.http = new HttpClient().configure(config => {
      config.useStandardConfiguration().withBaseUrl(c.baseUrl() + '/api/');
    });
  }
};