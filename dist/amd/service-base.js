define(['exports', 'aurelia-fetch-client', './constants', 'isomorphic-fetch'], function (exports, _aureliaFetchClient, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ServiceBase = undefined;

  var c = _interopRequireWildcard(_constants);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ServiceBase = exports.ServiceBase = function ServiceBase() {
    _classCallCheck(this, ServiceBase);

    this.http = new _aureliaFetchClient.HttpClient().configure(function (config) {
      config.useStandardConfiguration().withBaseUrl(c.baseUrl() + '/api/');
    });
  };
});