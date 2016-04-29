import {CrudService} from './crud-service';

class QueueModel {
  constructor(data, http) {
    Object.assign(this, data);
    this.http = http;
  }
}

export class QueueService extends CrudService {
  constructor() {
    super(QueueModel, { singular: 'bus/queue', plural: 'bus/queue' });
  }
}
