import 'isomorphic-fetch';
import {json,HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';

export function baseUrl() {
  let location = window.location;
  return (location.hostname === 'localhost') ?
    `${location.protocol}//${location.hostname}:3000` :   // testing
    `${location.protocol}//${location.host}`;             // deployed
}

export class ServiceBase {
  constructor(httpClient) {
    if (httpClient.baseUrl === '') {
      httpClient.baseUrl = baseUrl() + '/api/';
    }

    this.http = httpClient;
  }
}

export class CrudService extends ServiceBase {
  constructor(httpClient, Model, options) {
    super(httpClient);

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
    let url = (!!identifier) ?
      this.endpoints.singular + '/' + identifier : this.endpoints.singular;
    return this._fetch(url);
  }

  list(options) {
    let url = this.endpoints.plural;
    let query = [];

    if (!!options) {
      if (!!options.order) query.push('sort=' + options.order);
      if (!!options.offset || options.offset !== undefined) {
        if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
        query.push('offset=' + (+options.offset));
      }

      if (!!options.limit) {
        if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
        query.push('count=' + (+options.limit));
      }

      if (!!options.q) query.push('q=' + options.q);

      Object.keys(options)
        .filter(key => (key !== 'order' && key !== 'offset' && key !== 'limit' && key !== 'q'))
        .forEach(option => {
          let value =
            Array.isArray(options[option]) ? options[option].join(',') : options[option];
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
            console.error(err);
            return response;
          });
      });
  }
}

class BrokerModel {
  constructor(data) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class BrokerService extends CrudService {
  constructor(httpClient) {
    super(httpClient, BrokerModel, { singular: 'bus', plural: 'bus' });
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

@inject(HttpClient)
export class ExchangeService extends CrudService {
  constructor(httpClient) {
    super(httpClient, ExchangeModel, { singular: 'bus/exchange', plural: 'bus/exchange' });
  }
}

class GuestPoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class GuestPoolService extends CrudService {
  constructor(httpClient) {
    super(httpClient, GuestPoolModel, { singular: 'pool', plural: 'pools' });
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

@inject(HttpClient)
class MemoryMetricsService extends ServiceBase {
  constructor(httpClient) { super(httpClient); }
  read(fabric, start) {
    start = start || 3600;  // 1hr
    return this.http.get('metrics/fabric/' + fabric + '/memory?start=' + start)
      .then(response => response.json());
  }
}

@inject(HttpClient)
class CpuMetricsService extends ServiceBase {
  constructor(httpClient) { super(httpClient); }
  read(fabric, start) {
    start = start || 3600;  // 1hr
    return this.http.get('metrics/fabric/' + fabric + '/cpu?start=' + start)
      .then(response => response.json());
  }
}

@inject(HttpClient)
class SensorsMetricsService extends ServiceBase {
  constructor(httpClient) { super(httpClient); }
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

@inject(HttpClient, MemoryMetricsService, CpuMetricsService, SensorsMetricsService)
export class MetricsService extends ServiceBase {
  constructor(httpClient, memory, cpu, sensors) {
    super(httpClient);

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

class QueueModel {
  constructor(data, http) {
    Object.assign(this, data);
    this.http = http;
  }
}

@inject(HttpClient)
export class QueueService extends CrudService {
  constructor(httpClient) {
    super(httpClient, QueueModel, { singular: 'bus/queue', plural: 'bus/queue' });
  }
}

class RealmModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class RealmService extends CrudService {
  constructor(httpClient) {
    super(httpClient, RealmModel, { singular: 'realm', plural: 'realms' });
  }
}

class StoragePoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class StoragePoolService extends CrudService {
  constructor(httpClient) {
    super(httpClient, StoragePoolModel, { singular: 'storage/pool', plural: 'storage/pools' });
  }
}

class TemplateModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class TemplateService extends CrudService {
  constructor(httpClient) {
    super(httpClient, TemplateModel, { singular: 'template', plural: 'templates' });
  }
}

class UserModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

@inject(HttpClient)
export class UserService extends CrudService {
  constructor(httpClient) {
    super(httpClient, UserModel, { singular: 'user', plural: 'users' });
  }
}
