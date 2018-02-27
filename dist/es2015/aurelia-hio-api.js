var _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5, _dec6, _class6, _dec7, _class7, _dec8, _class8, _dec9, _class9, _dec10, _class10, _dec11, _class11, _dec12, _class12, _dec13, _class13, _dec14, _class14;

import 'isomorphic-fetch';
import { json, HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-dependency-injection';

export function baseUrl() {
  let location = window.location;
  return location.hostname === 'localhost' ? `${ location.protocol }//${ location.hostname }:3000` : `${ location.protocol }//${ location.host }`;
}

export let ServiceBase = class ServiceBase {
  constructor(httpClient) {
    if (httpClient.baseUrl === '') {
      httpClient.baseUrl = baseUrl() + '/api/';
    }

    this.http = httpClient;
  }
};

export let CrudService = class CrudService extends ServiceBase {
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

export let BrokerService = (_dec = inject(HttpClient), _dec(_class = class BrokerService extends CrudService {
  constructor(httpClient) {
    super(httpClient, BrokerModel, { singular: 'bus', plural: 'bus' });
  }
}) || _class);

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

export let ExchangeService = (_dec2 = inject(HttpClient), _dec2(_class2 = class ExchangeService extends CrudService {
  constructor(httpClient) {
    super(httpClient, ExchangeModel, { singular: 'bus/exchange', plural: 'bus/exchange' });
  }
}) || _class2);

let GuestPoolModel = class GuestPoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};

export let GuestPoolService = (_dec3 = inject(HttpClient), _dec3(_class3 = class GuestPoolService extends CrudService {
  constructor(httpClient) {
    super(httpClient, GuestPoolModel, { singular: 'pool', plural: 'pools' });
  }
}) || _class3);

let GuestModel = class GuestModel {
  constructor(data, http) {
    Object.assign(this, data);
    if (!this.hasOwnProperty('diskinfo')) {
      this.diskinfo = [{ diskUsage: 0, diskSize: 1 }];
    }

    ['reset', 'suspend', 'resume', 'poweroff', 'poweron', 'undefine', 'reboot', 'shutdown', 'delete'].map(action => {
      let self = this;
      this[action] = function () {
        return http.fetch('guest/' + self.name + '/' + action, { method: 'POST' });
      };
    });
  }

};

export let GuestService = (_dec4 = inject(HttpClient), _dec4(_class4 = class GuestService extends CrudService {
  constructor(httpClient) {
    super(httpClient, GuestModel, { singular: 'guest', plural: 'guests' });
  }
}) || _class4);

let HostModel = class HostModel {
  constructor(data, http) {
    Object.assign(this, data);

    this.hardware = this.hardware || {};
    this.hardware.bios = this.hardware.bios || {};
    this.hardware.bios.vendor = this.hardware.bios.vendor || 'Not Specified';
  }
};

export let HostService = (_dec5 = inject(HttpClient), _dec5(_class5 = class HostService extends CrudService {
  constructor(httpClient) {
    super(httpClient, HostModel, { singular: 'host', plural: 'hosts' });
  }

  statistics() {
    return this._fetch('host/statistics', { raw: true }).then(response => response.json());
  }

  overview() {
    return this._fetch('host/overview', { raw: true }).then(response => response.json());
  }

}) || _class5);

let MemoryMetricsService = (_dec6 = inject(HttpClient), _dec6(_class6 = class MemoryMetricsService extends ServiceBase {
  constructor(httpClient) {
    super(httpClient);
  }
  read(fabric, start) {
    start = start || 3600;
    return this.http.get('metrics/fabric/' + fabric + '/memory?start=' + start).then(response => response.json());
  }
}) || _class6);
let CpuMetricsService = (_dec7 = inject(HttpClient), _dec7(_class7 = class CpuMetricsService extends ServiceBase {
  constructor(httpClient) {
    super(httpClient);
  }
  read(fabric, start) {
    start = start || 3600;
    return this.http.get('metrics/fabric/' + fabric + '/cpu?start=' + start).then(response => response.json());
  }
}) || _class7);
let SensorsMetricsService = (_dec8 = inject(HttpClient), _dec8(_class8 = class SensorsMetricsService extends ServiceBase {
  constructor(httpClient) {
    super(httpClient);
  }
  list(fabric) {
    return this.http.fetch('metrics/fabric/' + fabric + '/sensorsList').then(response => response.json());
  }

  read(fabric, sensor, start) {
    start = start || 3600;
    return this.http.fetch('metrics/fabric/' + fabric + '/sensor/' + sensor + '?start=' + start).then(response => response.json());
  }
}) || _class8);

export let MetricsService = (_dec9 = inject(HttpClient, MemoryMetricsService, CpuMetricsService, SensorsMetricsService), _dec9(_class9 = class MetricsService extends ServiceBase {
  constructor(httpClient, memory, cpu, sensors) {
    super(httpClient);

    this.memory = memory;
    this.cpu = cpu;
    this.sensors = sensors;
  }

  read(fabric, start) {
    start = start || 3600;
    return this.http.fetch('metrics/fabric/' + fabric + '?start=' + start).then(response => response.json());
  }
}) || _class9);

let QueueModel = class QueueModel {
  constructor(data, http) {
    Object.assign(this, data);
    this.http = http;
  }
};

export let QueueService = (_dec10 = inject(HttpClient), _dec10(_class10 = class QueueService extends CrudService {
  constructor(httpClient) {
    super(httpClient, QueueModel, { singular: 'bus/queue', plural: 'bus/queue' });
  }
}) || _class10);

let RealmModel = class RealmModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};

export let RealmService = (_dec11 = inject(HttpClient), _dec11(_class11 = class RealmService extends CrudService {
  constructor(httpClient) {
    super(httpClient, RealmModel, { singular: 'realm', plural: 'realms' });
  }
}) || _class11);

let StoragePoolModel = class StoragePoolModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};

export let StoragePoolService = (_dec12 = inject(HttpClient), _dec12(_class12 = class StoragePoolService extends CrudService {
  constructor(httpClient) {
    super(httpClient, StoragePoolModel, { singular: 'storage/pool', plural: 'storage/pools' });
  }
}) || _class12);

let TemplateModel = class TemplateModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};

export let TemplateService = (_dec13 = inject(HttpClient), _dec13(_class13 = class TemplateService extends CrudService {
  constructor(httpClient) {
    super(httpClient, TemplateModel, { singular: 'template', plural: 'templates' });
  }
}) || _class13);

let UserModel = class UserModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};

export let UserService = (_dec14 = inject(HttpClient), _dec14(_class14 = class UserService extends CrudService {
  constructor(httpClient) {
    super(httpClient, UserModel, { singular: 'user', plural: 'users' });
  }
}) || _class14);