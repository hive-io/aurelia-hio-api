import 'isomorphic-fetch';
import {
  HttpClient,
  json
} from 'aurelia-fetch-client';
import {
  inject
} from 'aurelia-framework';
export declare function baseUrl(): any;
export declare class ServiceBase {
  constructor();
}
export declare class CrudService extends ServiceBase {
  constructor(Model?: any, options?: any);
  create(data?: any): any;
  read(identifier?: any): any;
  list(options?: any): any;
  update(identifier?: any, data?: any): any;
  remove(identifier?: any): any;
}
export declare class BrokerService extends CrudService {
  constructor();
}
export declare class ExchangeService extends CrudService {
  constructor();
}
export declare class GuestPoolService extends CrudService {
  constructor();
}
export declare class GuestService extends CrudService {
  constructor();
}
export declare class HostService extends CrudService {
  constructor();
  statistics(): any;
  overview(): any;
}
export declare class MetricsService extends ServiceBase {
  constructor(memory?: any, cpu?: any, sensors?: any);
  read(fabric?: any, start?: any): any;
}
export declare class QueueService extends CrudService {
  constructor();
}
export declare class RealmService extends CrudService {
  constructor();
}
export declare class StoragePoolService extends CrudService {
  constructor();
}
export declare class TemplateService extends CrudService {
  constructor();
}
export declare class UserService extends CrudService {
  constructor();
}