'use strict';

System.register(['aurelia-fetch-client', './constants', 'isomorphic-fetch'], function (_export, _context) {
  var HttpClient, c, ServiceBase;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_constants) {
      c = _constants;
    }, function (_isomorphicFetch) {}],
    execute: function () {
      _export('ServiceBase', ServiceBase = function ServiceBase() {
        _classCallCheck(this, ServiceBase);

        this.http = new HttpClient().configure(function (config) {
          config.useStandardConfiguration().withBaseUrl(c.baseUrl() + '/api/');
        });
      });

      _export('ServiceBase', ServiceBase);
    }
  };
});