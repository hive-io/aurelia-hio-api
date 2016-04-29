'use strict';

System.register(['./service-base', './crud-service', './guest-service', './host-service', './metrics-service', './realm-service'], function (_export, _context) {
  var ServiceBase, CrudService, GuestService, HostService, MetricsService, RealmService;
  return {
    setters: [function (_serviceBase) {
      ServiceBase = _serviceBase.ServiceBase;
    }, function (_crudService) {
      CrudService = _crudService.CrudService;
    }, function (_guestService) {
      GuestService = _guestService.GuestService;
    }, function (_hostService) {
      HostService = _hostService.HostService;
    }, function (_metricsService) {
      MetricsService = _metricsService.MetricsService;
    }, function (_realmService) {
      RealmService = _realmService.RealmService;
    }],
    execute: function () {
      function configure(aurelia) {}

      _export('configure', configure);

      _export('ServiceBase', ServiceBase);

      _export('CrudService', CrudService);

      _export('GuestService', GuestService);

      _export('HostService', HostService);

      _export('MetricsService', MetricsService);

      _export('RealmService', RealmService);
    }
  };
});