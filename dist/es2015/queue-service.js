import { CrudService } from './crud-service';

let QueueModel = class QueueModel {
  constructor(data, http) {
    Object.assign(this, data);
    this.http = http;
  }
};


export let QueueService = class QueueService extends CrudService {
  constructor() {
    super(QueueModel, { singular: 'bus/queue', plural: 'bus/queue' });
  }
};