'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RealmService = exports.MetricsService = exports.HostService = exports.GuestService = exports.CrudService = exports.ServiceBase = undefined;
exports.configure = configure;

var _serviceBase = require('./service-base');

var _crudService = require('./crud-service');

var _guestService = require('./guest-service');

var _hostService = require('./host-service');

var _metricsService = require('./metrics-service');

var _realmService = require('./realm-service');

function configure(aurelia) {}
exports.ServiceBase = _serviceBase.ServiceBase;
exports.CrudService = _crudService.CrudService;
exports.GuestService = _guestService.GuestService;
exports.HostService = _hostService.HostService;
exports.MetricsService = _metricsService.MetricsService;
exports.RealmService = _realmService.RealmService;