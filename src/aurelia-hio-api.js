import {ServiceBase} from './service-base';
import {CrudService} from './crud-service';
import {GuestService} from './guest-service';
import {HostService} from './host-service';
import {MetricsService} from './metrics-service';
import {RealmService} from './realm-service';
import {BrokerService} from './broker-service';
import {ExchangeService} from './exchange-service';
import {QueueService} from './queue-service';

export function configure(aurelia) {}
export {
  ServiceBase,
  CrudService,
  GuestService,
  HostService,
  MetricsService,
  RealmService,
  BrokerService,
  ExchangeService,
  QueueService
};
