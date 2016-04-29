define(['exports', './service-base', './crud-service', './guest-service', './host-service', './metrics-service', './realm-service'], function (exports, _serviceBase, _crudService, _guestService, _hostService, _metricsService, _realmService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RealmService = exports.MetricsService = exports.HostService = exports.GuestService = exports.CrudService = exports.ServiceBase = undefined;
  exports.configure = configure;
  function configure(aurelia) {}
  exports.ServiceBase = _serviceBase.ServiceBase;
  exports.CrudService = _crudService.CrudService;
  exports.GuestService = _guestService.GuestService;
  exports.HostService = _hostService.HostService;
  exports.MetricsService = _metricsService.MetricsService;
  exports.RealmService = _realmService.RealmService;
});