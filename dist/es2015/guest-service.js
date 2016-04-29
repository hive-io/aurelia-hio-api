import { CrudService } from './crud-service';

let GuestModel = class GuestModel {
  constructor(data, http) {
    Object.assign(this, data);
    if (!this.hasOwnProperty('diskinfo')) {
      this.diskinfo = [{ diskUsage: 0, diskSize: 1 }];
    }

    ['reset', 'suspend', 'resume', 'poweroff', 'poweron', 'undefine', 'reboot', 'shutdown'].map(action => {
      let self = this;
      this[action] = function () {
        console.log('called: ', action);
        console.log('   => ', 'guest/' + self.name + '/' + action);
        return http.fetch('guest/' + self.name + '/' + action, { method: 'POST' });
      };
    });
  }

};


export let GuestService = class GuestService extends CrudService {
  constructor() {
    super(GuestModel, { singular: 'guest', plural: 'guests' });
  }
};