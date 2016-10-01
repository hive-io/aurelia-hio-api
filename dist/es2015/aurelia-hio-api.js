var _dec, _class;

import 'isomorphic-fetch';
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

export function baseUrl() {
  let location = window.location;
  return location.hostname === 'localhost' ? `${ location.protocol }//${ location.hostname }:3000` : `${ location.protocol }//${ location.host }`;
}

export let ServiceBase = class ServiceBase {
  constructor() {
    this.http = new HttpClient().configure(config => {
      config.useStandardConfiguration().withBaseUrl(baseUrl() + '/api/');
    });
  }
};

export let CrudService = class CrudService extends ServiceBase {
  constructor(Model, options) {
    super();

    this.Model = Model;
    this.endpoints = {
      singular: options.singular,
      plural: options.plural
    };
  }

  create(data) {
    let url = this.endpoints.plural;
    return this._fetch(url, {
      method: 'POST',
      body: json(data)
    });
  }

  read(identifier) {
    let url = !!identifier ? this.endpoints.singular + '/' + identifier : this.endpoints.singular;
    return this._fetch(url);
  }

  list(options) {
    let url = this.endpoints.plural;
    let query = [];

    if (!!options) {
      if (!!options.order) query.push('sort=' + options.order);
      if (!!options.offset || options.offset !== undefined) {
        if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
        query.push('offset=' + +options.offset);
      }

      if (!!options.limit) {
        if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
        query.push('count=' + +options.limit);
      }

      if (!!options.q) query.push('q=' + options.q);

      Object.keys(options).filter(key => key !== 'order' && key !== 'offset' && key !== 'limit' && key !== 'q').forEach(option => {
        let value = Array.isArray(options[option]) ? options[option].join(',') : options[option];
        query.push(option + '=' + value);
      });
    }

    if (query.length) url = url + '?' + query.join('&');
    return this._fetch(url);
  }

  update(identifier, data) {
    return this._fetch(this.endpoints.singular, {
      method: 'PUT',
      body: json(data)
    });
  }

  remove(identifier) {
    return this._fetch(this.endpoints.singular, {
      method: 'DELETE'
    });
  }

  _fetch(url, options) {
    let raw = false;
    if (options && options.hasOwnProperty('raw')) {
      raw = options.raw;
      delete options.raw;
    }

    let self = this;
    return this.http.fetch(url, options).then(response => {
      if (!!raw) return response;
      return response.json().then(data => {
        let body = Array.isArray(data) ? data.map(v => typeof v === 'object' ? new self.Model(v, self.http) : v) : typeof data === 'object' ? new self.Model(data, self.http) : data;

        return { headers: response.headers, body: body };
      }).catch(err => {
        console.error(err);
        return response;
      });
    });
  }
};

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

let ExchangeModel = class ExchangeModel {
  constructor(data, http) {
    Object.assign(this, data);
    this.http = http;
  }

  publish(message) {
    return this.http.fetch('bus/exchange/' + this.name, {
      method: 'POST', body: json(message)
    });
  }
};


export let ExchangeService = class ExchangeService extends CrudService {
  constructor() {
    super(ExchangeModel, { singular: 'bus/exchange', plural: 'bus/exchange' });
  }
};

let GuestPoolModel = class GuestPoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};


export let GuestPoolService = class GuestPoolService extends CrudService {
  constructor() {
    super(GuestPoolModel, { singular: 'pool', plural: 'pools' });
  }
};

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

let MemoryMetricsService = class MemoryMetricsService extends ServiceBase {
  read(fabric, start) {
    start = start || 3600;
    return self.http.get('metrics/fabric/' + fabric + '/memory?start=' + start).then(response => response.json());
  }
};
let CpuMetricsService = class CpuMetricsService extends ServiceBase {
  read(fabric, start) {
    start = start || 3600;
    return self.http.get('metrics/fabric/' + fabric + '/cpu?start=' + start).then(response => response.json());
  }
};
let SensorsMetricsService = class SensorsMetricsService extends ServiceBase {
  list(fabric) {
    return this.http.fetch('metrics/fabric/' + fabric + '/sensors').then(response => response.json());
  }

  read(fabric, sensor, start) {
    start = start || 3600;
    return this.http.fetch('metrics/fabric/' + fabric + '/sensors?sensor=' + sensor + '&start=' + start).then(response => response.json());
  }
};

export let MetricsService = (_dec = inject(MemoryMetricsService, CpuMetricsService, SensorsMetricsService), _dec(_class = class MetricsService extends ServiceBase {
  constructor(memory, cpu, sensors) {
    super();

    this.memory = memory;
    this.cpu = cpu;
    this.sensors = sensors;
  }

  read(fabric, start) {
    start = start || 3600;
    return this.http.fetch('metrics/fabric/' + fabric + '?start=' + start).then(response => response.json());
  }
}) || _class);

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

let RealmModel = class RealmModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};


export let RealmService = class RealmService extends CrudService {
  constructor() {
    super(RealmModel, { singular: 'realm', plural: 'realms' });
  }
};

let StoragePoolModel = class StoragePoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};


export let StoragePoolService = class StoragePoolService extends CrudService {
  constructor() {
    super(StoragePoolModel, { singular: 'storage/pool', plural: 'storage/pools' });
  }
};

let TemplateModel = class TemplateModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};


export let TemplateService = class TemplateService extends CrudService {
  constructor() {
    super(TemplateModel, { singular: 'template', plural: 'templates' });
  }
};

let UserModel = class UserModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};


export let UserService = class UserService extends CrudService {
  constructor() {
    super(UserModel, { singular: 'user', plural: 'users' });
  }
};