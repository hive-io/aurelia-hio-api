import {CrudService} from './crud-service';

class GuestModel {
  constructor(data, http) {
    Object.assign(this, data);
    if (!this.hasOwnProperty('diskinfo')) {
      this.diskinfo = [ { diskUsage: 0, diskSize: 1 } ];
    }

    // add guest actions
    [ 'reset', 'suspend', 'resume', 'poweroff',
      'poweron', 'undefine', 'reboot', 'shutdown'
    ].map(action => {
      let self = this;
      this[action] = function() {
        console.log('called: ', action);
        console.log('   => ', 'guest/' + self.name + '/' + action);
        return http.fetch('guest/' + self.name + '/' + action, { method: 'POST' });
      };
    });
  }

}

export class GuestService extends CrudService {
  constructor() {
    super(GuestModel, { singular: 'guest', plural: 'guests' });
  }
}
