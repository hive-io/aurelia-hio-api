import {CrudService} from './crud-service';
import {HttpClient} from 'aurelia-fetch-client';

class HostModel {
  constructor(data, http) {
    Object.assign(this, data);

    // handle defaults for hardware
    this.hardware = this.hardware || {};
    this.hardware.bios = this.hardware.bios || {};
    this.hardware.bios.vendor = this.hardware.bios.vendor || 'Not Specified';
  }
}

@inject(HttpClient)
export class HostService extends CrudService {
  constructor(httpClient) {
    super(httpClient, HostModel, { singular: 'host', plural: 'hosts' });
  }

  statistics() {
    return this._fetch('host/statistics', { raw: true })
      .then(response => response.json());
  }

  overview() {
    return this._fetch('host/overview', { raw: true })
      .then(response => response.json());
  }

  // host actions
  // this.hosts = this.generateActions('host', ['reboot', 'shutdown', 'restartNetwork']);

}
