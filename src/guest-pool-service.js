import {CrudService} from './crud-service';

class GuestPoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

export class GuestPoolService extends CrudService {
  constructor() {
    super(GuestPoolModel, { singular: 'pool', plural: 'pools' });
  }
}
