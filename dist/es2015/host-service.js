import { CrudService } from './crud-service';

let HostModel = class HostModel {
  constructor(data, http) {
    Object.assign(this, data);

    this.hardware = this.hardware || {};
    this.hardware.bios = this.hardware.bios || {};
    this.hardware.bios.vendor = this.hardware.bios.vendor || 'Not Specified';
  }
};


export let HostService = class HostService extends CrudService {
  constructor() {
    super(HostModel, { singular: 'host', plural: 'hosts' });
  }

  statistics() {
    return this._fetch('host/statistics', { raw: true }).then(response => response.json());
  }

  overview() {
    return this._fetch('host/overview', { raw: true }).then(response => response.json());
  }

};