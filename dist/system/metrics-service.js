'use strict';

System.register(['aurelia-framework', './service-base'], function (_export, _context) {
  var inject, ServiceBase, _dec, _class, MemoryMetricsService, CpuMetricsService, SensorsMetricsService, MetricsService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_serviceBase) {
      ServiceBase = _serviceBase.ServiceBase;
    }],
    execute: function () {
      MemoryMetricsService = function (_ServiceBase) {
        _inherits(MemoryMetricsService, _ServiceBase);

        function MemoryMetricsService() {
          _classCallCheck(this, MemoryMetricsService);

          return _possibleConstructorReturn(this, _ServiceBase.apply(this, arguments));
        }

        MemoryMetricsService.prototype.read = function read(fabric, start) {
          start = start || 3600;
          return self.http.get('metrics/fabric/' + fabric + '/memory?start=' + start).then(function (response) {
            return response.json();
          });
        };

        return MemoryMetricsService;
      }(ServiceBase);

      CpuMetricsService = function (_ServiceBase2) {
        _inherits(CpuMetricsService, _ServiceBase2);

        function CpuMetricsService() {
          _classCallCheck(this, CpuMetricsService);

          return _possibleConstructorReturn(this, _ServiceBase2.apply(this, arguments));
        }

        CpuMetricsService.prototype.read = function read(fabric, start) {
          start = start || 3600;
          return self.http.get('metrics/fabric/' + fabric + '/cpu?start=' + start).then(function (response) {
            return response.json();
          });
        };

        return CpuMetricsService;
      }(ServiceBase);

      SensorsMetricsService = function (_ServiceBase3) {
        _inherits(SensorsMetricsService, _ServiceBase3);

        function SensorsMetricsService() {
          _classCallCheck(this, SensorsMetricsService);

          return _possibleConstructorReturn(this, _ServiceBase3.apply(this, arguments));
        }

        SensorsMetricsService.prototype.list = function list(fabric) {
          return this.http.fetch('metrics/fabric/' + fabric + '/sensors').then(function (response) {
            return response.json();
          });
        };

        SensorsMetricsService.prototype.read = function read(fabric, sensor, start) {
          start = start || 3600;
          return this.http.fetch('metrics/fabric/' + fabric + '/sensors?sensor=' + sensor + '&start=' + start).then(function (response) {
            return response.json();
          });
        };

        return SensorsMetricsService;
      }(ServiceBase);

      _export('MetricsService', MetricsService = (_dec = inject(MemoryMetricsService, CpuMetricsService, SensorsMetricsService), _dec(_class = function (_ServiceBase4) {
        _inherits(MetricsService, _ServiceBase4);

        function MetricsService(memory, cpu, sensors) {
          _classCallCheck(this, MetricsService);

          var _this4 = _possibleConstructorReturn(this, _ServiceBase4.call(this));

          _this4.memory = memory;
          _this4.cpu = cpu;
          _this4.sensors = sensors;
          return _this4;
        }

        MetricsService.prototype.read = function read(fabric, start) {
          start = start || 3600;
          return this.http.fetch('metrics/fabric/' + fabric + '?start=' + start).then(function (response) {
            return response.json();
          });
        };

        return MetricsService;
      }(ServiceBase)) || _class));

      _export('MetricsService', MetricsService);
    }
  };
});