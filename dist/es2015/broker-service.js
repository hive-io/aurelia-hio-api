import { CrudService } from './crud-service';

let BrokerModel = class BrokerModel {
  constructor(data) {
    Object.assign(this, data);
  }
};


export let BrokerService = class BrokerService extends CrudService {
  constructor() {
    super(BrokerModel, { singular: 'bus', plural: 'bus' });
  }
};