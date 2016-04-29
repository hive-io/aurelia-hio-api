import 'isomorphic-fetch';
import {HttpClient,json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

export function baseUrl() {
  return (window.location.hostname === 'localhost') ?
    'http://' + location.hostname + ':3000' :   // testing
    'http://' + location.host;                  // deployed
}

import * as c from './constants';
export class ServiceBase {
  constructor() {
    this.http = new HttpClient()
      .configure(config => {
        config
          .useStandardConfiguration()
          .withBaseUrl(c.baseUrl() + '/api/');
      });
  }
}

export class CrudService extends ServiceBase {
  constructor(Model, options) {
    super();

    this.Model = Model;
    this.endpoints = {
      singular: options.singular,
      plural: options.plural
    };
  }

  read(identifier) {
    let url = (!!identifier) ?
      this.endpoints.singular + '/' + identifier : this.endpoints.singular;
    return this._fetch(url);
  }

  list(options) {
    let url = this.endpoints.plural;
    let query = [];

    if (!!options) {
      if (!!options.order) query.push("sort=" + options.order);
      if (!!options.offset || options.offset !== undefined) {
        if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
        query.push("offset=" + (+options.offset));
      }

      if (!!options.limit) {
        if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
        query.push("count=" + (+options.limit));
      }

      if (!!options.q) query.push("q=" + options.q);

      Object.keys(options)
        .filter(key => (key !== 'order' && key !== 'offset' && key !== 'limit' && key !== 'q'))
        .forEach(option => {
          let value =
            Array.isArray(options[option]) ? options[option].join(',') : options[option];
          query.push(option + '=' + value);
        });
    }

    if (query.length) url = url + "?" + query.join('&');
    return this._fetch(url);
  }

  // private
  _fetch(url, options) {
    let raw = false;
    if (options && options.hasOwnProperty('raw')) {
      raw = options.raw;
      delete options.raw;
    }

    let self = this;
    return this.http.fetch(url, options)
      .then(response => {
        if (!!raw) return response;
        return response.json()
          .then(data => {
            let body = Array.isArray(data) ?
              data.map(v => (typeof v === 'object') ? new self.Model(v, self.http) : v) :
              (typeof data === 'object') ? new self.Model(data, self.http) : data;

            return { headers: response.headers, body: body };
          })
          .catch(err => {
            console.log(err); return response; });
      });
  }
}

class MemoryMetricsService extends ServiceBase {
  read(fabric, start) {
    start = start || 3600;  // 1hr
    return self.http.get('metrics/fabric/' + fabric + '/memory?start=' + start)
      .then(response => response.json());
  }
}

class CpuMetricsService extends ServiceBase {
  read(fabric, start) {
    start = start || 3600;  // 1hr
    return self.http.get('metrics/fabric/' + fabric + '/cpu?start=' + start)
      .then(response => response.json());
  }
}

class SensorsMetricsService extends ServiceBase {
  list(fabric) {
    return this.http.fetch('metrics/fabric/' + fabric + '/sensors')
      .then(response => response.json());
  }

  read(fabric, sensor, start) {
    start = start || 3600;  // 1hr
    return this.http.fetch('metrics/fabric/' + fabric + '/sensors?sensor=' + sensor + '&start=' + start)
      .then(response => response.json());
  }
}

@inject(MemoryMetricsService, CpuMetricsService, SensorsMetricsService)
export class MetricsService extends ServiceBase {
  constructor(memory, cpu, sensors) {
    super();

    this.memory = memory;
    this.cpu = cpu;
    this.sensors = sensors;
  }

  read(fabric, start) {
    start = start || 3600;  // 1hr
    return this.http.fetch('metrics/fabric/' + fabric + '?start=' + start)
      .then(response => response.json());
  }
}

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

class ExchangeModel {
  constructor(data, http) {
    Object.assign(this, data);
    this.http = http;
  }

  publish(message) {
    return this.http.fetch('bus/exchange/' + this.name, {
      method: 'POST', body: json(message)
    });
  }
}

export class ExchangeService extends CrudService {
  constructor() {
    super(ExchangeModel, { singular: 'bus/exchange', plural: 'bus/exchange' });
  }
}

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

class HostModel {
  constructor(data, http) {
    Object.assign(this, data);

    // handle defaults for hardware
    this.hardware = this.hardware || {};
    this.hardware.bios = this.hardware.bios || {};
    this.hardware.bios.vendor = this.hardware.bios.vendor || 'Not Specified';
  }
}

export class HostService extends CrudService {
  constructor() {
    super(HostModel, { singular: 'host', plural: 'hosts' });
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

class RealmModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

export class RealmService extends CrudService {
  constructor() {
    super(RealmModel, { singular: 'realm', plural: 'realms' });
  }
}

class TemplateModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

export class TemplateService extends CrudService {
  constructor() {
    super(TemplateModel, { singular: 'template', plural: 'templates' });
  }
}

class UserModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

export class UserService extends CrudService {
  constructor() {
    super(UserModel, { singular: 'user', plural: 'users' });
  }
}

export function configure(aurelia) {}
export {
  ServiceBase,
  CrudService,
  GuestService,
  HostService,
  MetricsService,
  RealmService,
  TemplateService,
  UserService,
  BrokerService,
  ExchangeService,
  QueueService
};
