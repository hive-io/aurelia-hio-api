import { CrudService } from './crud-service';

let RealmModel = class RealmModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};


export let RealmService = class RealmService extends CrudService {
  constructor() {
    super(RealmModel, { singular: 'realm', plural: 'realms' });
  }
};