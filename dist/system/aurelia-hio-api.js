'use strict';

System.register(['./service-base', './crud-service', './guest-service', './host-service', './metrics-service', './realm-service', './template-service', './user-service', './broker-service', './exchange-service', './queue-service'], function (_export, _context) {
  var ServiceBase, CrudService, GuestService, HostService, MetricsService, RealmService, TemplateService, UserService, BrokerService, ExchangeService, QueueService;
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
    }, function (_templateService) {
      TemplateService = _templateService.TemplateService;
    }, function (_userService) {
      UserService = _userService.UserService;
    }, function (_brokerService) {
      BrokerService = _brokerService.BrokerService;
    }, function (_exchangeService) {
      ExchangeService = _exchangeService.ExchangeService;
    }, function (_queueService) {
      QueueService = _queueService.QueueService;
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

      _export('TemplateService', TemplateService);

      _export('UserService', UserService);

      _export('BrokerService', BrokerService);

      _export('ExchangeService', ExchangeService);

      _export('QueueService', QueueService);
    }
  };
});