'use strict';

System.register(['isomorphic-fetch', 'aurelia-fetch-client', 'aurelia-dependency-injection'], function (_export, _context) {
  "use strict";

  var json, HttpClient, inject, _dec, _class, _dec2, _class2, _dec3, _class3, _dec4, _class4, _dec5, _class5, _dec6, _class6, _dec7, _class7, _dec8, _class8, _dec9, _class9, _dec10, _class10, _dec11, _class11, _dec12, _class12, _dec13, _class13, _dec14, _class14, _typeof, ServiceBase, CrudService, BrokerModel, BrokerService, ExchangeModel, ExchangeService, GuestPoolModel, GuestPoolService, GuestModel, GuestService, HostModel, HostService, MemoryMetricsService, CpuMetricsService, SensorsMetricsService, MetricsService, QueueModel, QueueService, RealmModel, RealmService, StoragePoolModel, StoragePoolService, TemplateModel, TemplateService, UserModel, UserService;

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

  

  function baseUrl() {
    var location = window.location;
    return location.hostname === 'localhost' ? location.protocol + '//' + location.hostname + ':3000' : location.protocol + '//' + location.host;
  }

  _export('baseUrl', baseUrl);

  return {
    setters: [function (_isomorphicFetch) {}, function (_aureliaFetchClient) {
      json = _aureliaFetchClient.json;
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _export('ServiceBase', ServiceBase = function ServiceBase(httpClient) {
        

        if (httpClient.baseUrl === '') {
          httpClient.baseUrl = baseUrl() + '/api/';
        }

        this.http = httpClient;
      });

      _export('ServiceBase', ServiceBase);

      _export('CrudService', CrudService = function (_ServiceBase) {
        _inherits(CrudService, _ServiceBase);

        function CrudService(httpClient, Model, options) {
          

          var _this = _possibleConstructorReturn(this, _ServiceBase.call(this, httpClient));

          _this.Model = Model;
          _this.endpoints = {
            singular: options.singular,
            plural: options.plural
          };
          return _this;
        }

        CrudService.prototype.create = function create(data) {
          var url = this.endpoints.plural;
          return this._fetch(url, {
            method: 'POST',
            body: json(data)
          });
        };

        CrudService.prototype.read = function read(identifier) {
          var url = !!identifier ? this.endpoints.singular + '/' + identifier : this.endpoints.singular;
          return this._fetch(url);
        };

        CrudService.prototype.list = function list(options) {
          var url = this.endpoints.plural;
          var query = [];

          if (!!options) {
            if (!!options.order) query.push('sort=' + options.order);
            if (!!options.offset || options.offset !== undefined) {
              if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
              query.push('offset=' + +options.offset);
            }

            if (!!options.limit) {
              if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
              query.push('count=' + +options.limit);
            }

            if (!!options.q) query.push('q=' + options.q);

            Object.keys(options).filter(function (key) {
              return key !== 'order' && key !== 'offset' && key !== 'limit' && key !== 'q';
            }).forEach(function (option) {
              var value = Array.isArray(options[option]) ? options[option].join(',') : options[option];
              query.push(option + '=' + value);
            });
          }

          if (query.length) url = url + '?' + query.join('&');
          return this._fetch(url);
        };

        CrudService.prototype.update = function update(identifier, data) {
          return this._fetch(this.endpoints.singular, {
            method: 'PUT',
            body: json(data)
          });
        };

        CrudService.prototype.remove = function remove(identifier) {
          return this._fetch(this.endpoints.singular, {
            method: 'DELETE'
          });
        };

        CrudService.prototype._fetch = function _fetch(url, options) {
          var raw = false;
          if (options && options.hasOwnProperty('raw')) {
            raw = options.raw;
            delete options.raw;
          }

          var self = this;
          return this.http.fetch(url, options).then(function (response) {
            if (!!raw) return response;
            return response.json().then(function (data) {
              var body = Array.isArray(data) ? data.map(function (v) {
                return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' ? new self.Model(v, self.http) : v;
              }) : (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' ? new self.Model(data, self.http) : data;

              return { headers: response.headers, body: body };
            }).catch(function (err) {
              console.error(err);
              return response;
            });
          });
        };

        return CrudService;
      }(ServiceBase));

      _export('CrudService', CrudService);

      BrokerModel = function BrokerModel(data) {
        

        Object.assign(this, data);
      };

      _export('BrokerService', BrokerService = (_dec = inject(HttpClient), _dec(_class = function (_CrudService) {
        _inherits(BrokerService, _CrudService);

        function BrokerService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService.call(this, httpClient, BrokerModel, { singular: 'bus', plural: 'bus' }));
        }

        return BrokerService;
      }(CrudService)) || _class));

      _export('BrokerService', BrokerService);

      ExchangeModel = function () {
        function ExchangeModel(data, http) {
          

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

      _export('ExchangeService', ExchangeService = (_dec2 = inject(HttpClient), _dec2(_class2 = function (_CrudService2) {
        _inherits(ExchangeService, _CrudService2);

        function ExchangeService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService2.call(this, httpClient, ExchangeModel, { singular: 'bus/exchange', plural: 'bus/exchange' }));
        }

        return ExchangeService;
      }(CrudService)) || _class2));

      _export('ExchangeService', ExchangeService);

      GuestPoolModel = function GuestPoolModel(data, http) {
        

        Object.assign(this, data);
      };

      _export('GuestPoolService', GuestPoolService = (_dec3 = inject(HttpClient), _dec3(_class3 = function (_CrudService3) {
        _inherits(GuestPoolService, _CrudService3);

        function GuestPoolService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService3.call(this, httpClient, GuestPoolModel, { singular: 'pool', plural: 'pools' }));
        }

        return GuestPoolService;
      }(CrudService)) || _class3));

      _export('GuestPoolService', GuestPoolService);

      GuestModel = function GuestModel(data, http) {
        var _this5 = this;

        

        Object.assign(this, data);
        if (!this.hasOwnProperty('diskinfo')) {
          this.diskinfo = [{ diskUsage: 0, diskSize: 1 }];
        }

        ['reset', 'suspend', 'resume', 'poweroff', 'poweron', 'undefine', 'reboot', 'shutdown', 'delete'].map(function (action) {
          var self = _this5;
          _this5[action] = function () {
            return http.fetch('guest/' + self.name + '/' + action, { method: 'POST' });
          };
        });
      };

      _export('GuestService', GuestService = (_dec4 = inject(HttpClient), _dec4(_class4 = function (_CrudService4) {
        _inherits(GuestService, _CrudService4);

        function GuestService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService4.call(this, httpClient, GuestModel, { singular: 'guest', plural: 'guests' }));
        }

        return GuestService;
      }(CrudService)) || _class4));

      _export('GuestService', GuestService);

      HostModel = function HostModel(data, http) {
        

        Object.assign(this, data);

        this.hardware = this.hardware || {};
        this.hardware.bios = this.hardware.bios || {};
        this.hardware.bios.vendor = this.hardware.bios.vendor || 'Not Specified';
      };

      _export('HostService', HostService = (_dec5 = inject(HttpClient), _dec5(_class5 = function (_CrudService5) {
        _inherits(HostService, _CrudService5);

        function HostService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService5.call(this, httpClient, HostModel, { singular: 'host', plural: 'hosts' }));
        }

        HostService.prototype.statistics = function statistics() {
          return this._fetch('host/statistics', { raw: true }).then(function (response) {
            return response.json();
          });
        };

        HostService.prototype.overview = function overview() {
          return this._fetch('host/overview', { raw: true }).then(function (response) {
            return response.json();
          });
        };

        return HostService;
      }(CrudService)) || _class5));

      _export('HostService', HostService);

      MemoryMetricsService = (_dec6 = inject(HttpClient), _dec6(_class6 = function (_ServiceBase2) {
        _inherits(MemoryMetricsService, _ServiceBase2);

        function MemoryMetricsService(httpClient) {
          

          return _possibleConstructorReturn(this, _ServiceBase2.call(this, httpClient));
        }

        MemoryMetricsService.prototype.read = function read(fabric, start) {
          start = start || 3600;
          return this.http.get('metrics/fabric/' + fabric + '/memory?start=' + start).then(function (response) {
            return response.json();
          });
        };

        return MemoryMetricsService;
      }(ServiceBase)) || _class6);
      CpuMetricsService = (_dec7 = inject(HttpClient), _dec7(_class7 = function (_ServiceBase3) {
        _inherits(CpuMetricsService, _ServiceBase3);

        function CpuMetricsService(httpClient) {
          

          return _possibleConstructorReturn(this, _ServiceBase3.call(this, httpClient));
        }

        CpuMetricsService.prototype.read = function read(fabric, start) {
          start = start || 3600;
          return this.http.get('metrics/fabric/' + fabric + '/cpu?start=' + start).then(function (response) {
            return response.json();
          });
        };

        return CpuMetricsService;
      }(ServiceBase)) || _class7);
      SensorsMetricsService = (_dec8 = inject(HttpClient), _dec8(_class8 = function (_ServiceBase4) {
        _inherits(SensorsMetricsService, _ServiceBase4);

        function SensorsMetricsService(httpClient) {
          

          return _possibleConstructorReturn(this, _ServiceBase4.call(this, httpClient));
        }

        SensorsMetricsService.prototype.list = function list(fabric) {
          return this.http.fetch('metrics/fabric/' + fabric + '/sensorsList').then(function (response) {
            return response.json();
          });
        };

        SensorsMetricsService.prototype.read = function read(fabric, sensor, start) {
          start = start || 3600;
          return this.http.fetch('metrics/fabric/' + fabric + '/sensor/' + sensor + '?start=' + start).then(function (response) {
            return response.json();
          });
        };

        return SensorsMetricsService;
      }(ServiceBase)) || _class8);

      _export('MetricsService', MetricsService = (_dec9 = inject(HttpClient, MemoryMetricsService, CpuMetricsService, SensorsMetricsService), _dec9(_class9 = function (_ServiceBase5) {
        _inherits(MetricsService, _ServiceBase5);

        function MetricsService(httpClient, memory, cpu, sensors) {
          

          var _this11 = _possibleConstructorReturn(this, _ServiceBase5.call(this, httpClient));

          _this11.memory = memory;
          _this11.cpu = cpu;
          _this11.sensors = sensors;
          return _this11;
        }

        MetricsService.prototype.read = function read(fabric, start) {
          start = start || 3600;
          return this.http.fetch('metrics/fabric/' + fabric + '?start=' + start).then(function (response) {
            return response.json();
          });
        };

        return MetricsService;
      }(ServiceBase)) || _class9));

      _export('MetricsService', MetricsService);

      QueueModel = function QueueModel(data, http) {
        

        Object.assign(this, data);
        this.http = http;
      };

      _export('QueueService', QueueService = (_dec10 = inject(HttpClient), _dec10(_class10 = function (_CrudService6) {
        _inherits(QueueService, _CrudService6);

        function QueueService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService6.call(this, httpClient, QueueModel, { singular: 'bus/queue', plural: 'bus/queue' }));
        }

        return QueueService;
      }(CrudService)) || _class10));

      _export('QueueService', QueueService);

      RealmModel = function RealmModel(data, http) {
        

        Object.assign(this, data);
      };

      _export('RealmService', RealmService = (_dec11 = inject(HttpClient), _dec11(_class11 = function (_CrudService7) {
        _inherits(RealmService, _CrudService7);

        function RealmService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService7.call(this, httpClient, RealmModel, { singular: 'realm', plural: 'realms' }));
        }

        return RealmService;
      }(CrudService)) || _class11));

      _export('RealmService', RealmService);

      StoragePoolModel = function StoragePoolModel(data, http) {
        

        Object.assign(this, data);
      };

      _export('StoragePoolService', StoragePoolService = (_dec12 = inject(HttpClient), _dec12(_class12 = function (_CrudService8) {
        _inherits(StoragePoolService, _CrudService8);

        function StoragePoolService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService8.call(this, httpClient, StoragePoolModel, { singular: 'storage/pool', plural: 'storage/pools' }));
        }

        return StoragePoolService;
      }(CrudService)) || _class12));

      _export('StoragePoolService', StoragePoolService);

      TemplateModel = function TemplateModel(data, http) {
        

        Object.assign(this, data);
      };

      _export('TemplateService', TemplateService = (_dec13 = inject(HttpClient), _dec13(_class13 = function (_CrudService9) {
        _inherits(TemplateService, _CrudService9);

        function TemplateService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService9.call(this, httpClient, TemplateModel, { singular: 'template', plural: 'templates' }));
        }

        return TemplateService;
      }(CrudService)) || _class13));

      _export('TemplateService', TemplateService);

      UserModel = function UserModel(data, http) {
        

        Object.assign(this, data);
      };

      _export('UserService', UserService = (_dec14 = inject(HttpClient), _dec14(_class14 = function (_CrudService10) {
        _inherits(UserService, _CrudService10);

        function UserService(httpClient) {
          

          return _possibleConstructorReturn(this, _CrudService10.call(this, httpClient, UserModel, { singular: 'user', plural: 'users' }));
        }

        return UserService;
      }(CrudService)) || _class14));

      _export('UserService', UserService);
    }
  };
});