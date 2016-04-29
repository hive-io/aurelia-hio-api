import {CrudService} from './crud-service';

class BrokerModel {
  constructor(data) {
    Object.assign(this, data);
  }
}

export class BrokerService extends CrudService {
  constructor() {
    super(BrokerModel, { singular: 'bus', plural: 'bus' });
  }
}
