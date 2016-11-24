import {CrudService} from './crud-service';
import {HttpClient} from 'aurelia-fetch-client';

class TemplateModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class TemplateService extends CrudService {
  constructor(httpClient) {
    super(httpClient, TemplateModel, { singular: 'template', plural: 'templates' });
  }
}
