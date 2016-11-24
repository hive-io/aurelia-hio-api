import 'isomorphic-fetch';
import {
  json,
  HttpClient
} from 'aurelia-fetch-client';
import {
  inject
} from 'aurelia-dependency-injection';
export declare function baseUrl(): any;
export declare class ServiceBase {
  constructor(httpClient?: any);
}
export declare class CrudService extends ServiceBase {
  constructor(httpClient?: any, Model?: any, options?: any);
  create(data?: any): any;
  read(identifier?: any): any;
  list(options?: any): any;
  update(identifier?: any, data?: any): any;
  remove(identifier?: any): any;
}
export declare class BrokerService extends CrudService {
  constructor(httpClient?: any);
}
export declare class ExchangeService extends CrudService {
  constructor(httpClient?: any);
}
export declare class GuestPoolService extends CrudService {
  constructor(httpClient?: any);
}
export declare class GuestService extends CrudService {
  constructor(httpClient?: any);
}
export declare class HostService extends CrudService {
  constructor(httpClient?: any);
  statistics(): any;
  overview(): any;
}
export declare class MetricsService extends ServiceBase {
  constructor(httpClient?: any, memory?: any, cpu?: any, sensors?: any);
  read(fabric?: any, start?: any): any;
}
export declare class QueueService extends CrudService {
  constructor(httpClient?: any);
}
export declare class RealmService extends CrudService {
  constructor(httpClient?: any);
}
export declare class StoragePoolService extends CrudService {
  constructor(httpClient?: any);
}
export declare class TemplateService extends CrudService {
  constructor(httpClient?: any);
}
export declare class UserService extends CrudService {
  constructor(httpClient?: any);
}