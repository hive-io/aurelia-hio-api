'use strict';

System.register(['./crud-service', 'aurelia-fetch-client'], function (_export, _context) {
  var CrudService, json, ExchangeModel, ExchangeService;

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_crudService) {
      CrudService = _crudService.CrudService;
    }, function (_aureliaFetchClient) {
      json = _aureliaFetchClient.json;
    }],
    execute: function () {
      ExchangeModel = function () {
        function ExchangeModel(data, http) {
          _classCallCheck(this, ExchangeModel);

          Object.assign(this, data);
          this.http = http;
        }

        ExchangeModel.prototype.publish = function publish(message) {
          return this.http.fetch('bus/exchange/' + this.name, {
            method: 'POST', body: json(message)
          });
        };

        return ExchangeModel;
      }();

      _export('ExchangeService', ExchangeService = function (_CrudService) {
        _inherits(ExchangeService, _CrudService);

        function ExchangeService() {
          _classCallCheck(this, ExchangeService);

          return _possibleConstructorReturn(this, _CrudService.call(this, ExchangeModel, { singular: 'bus/exchange', plural: 'bus/exchange' }));
        }

        return ExchangeService;
      }(CrudService));

      _export('ExchangeService', ExchangeService);
    }
  };
});