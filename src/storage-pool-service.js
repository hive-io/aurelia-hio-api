import {CrudService} from './crud-service';

class StoragePoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

export class StoragePoolService extends CrudService {
  constructor() {
    super(StoragePoolModel, { singular: 'storage/pool', plural: 'storage/pools' });
  }
}
