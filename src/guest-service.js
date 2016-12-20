import {CrudService} from './crud-service';
import {HttpClient} from 'aurelia-fetch-client';

class GuestModel {
  constructor(data, http) {
    Object.assign(this, data);
    if (!this.hasOwnProperty('diskinfo')) {
      this.diskinfo = [ { diskUsage: 0, diskSize: 1 } ];
    }

    // add guest actions
    [ 'reset', 'suspend', 'resume', 'poweroff',
      'poweron', 'undefine', 'reboot', 'shutdown', 'delete'
    ].map(action => {
      let self = this;
      this[action] = function() {
        return http.fetch('guest/' + self.name + '/' + action, { method: 'POST' });
      };
    });
  }

}

@inject(HttpClient)
export class GuestService extends CrudService {
  constructor(httpClient) {
    super(httpClient, GuestModel, { singular: 'guest', plural: 'guests' });
  }
}
