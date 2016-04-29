import {CrudService} from './crud-service';

class TemplateModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

export class TemplateService extends CrudService {
  constructor() {
    super(TemplateModel, { singular: 'template', plural: 'templates' });
  }
}
