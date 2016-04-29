import {CrudService} from './crud-service';

class RealmModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

export class RealmService extends CrudService {
  constructor() {
    super(RealmModel, { singular: 'realm', plural: 'realms' });
  }
}
