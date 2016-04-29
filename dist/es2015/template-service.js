import { CrudService } from './crud-service';

let TemplateModel = class TemplateModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};


export let TemplateService = class TemplateService extends CrudService {
  constructor() {
    super(TemplateModel, { singular: 'template', plural: 'templates' });
  }
};