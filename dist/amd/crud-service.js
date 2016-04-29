define(['exports', './service-base'], function (exports, _serviceBase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CrudService = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

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

  var CrudService = exports.CrudService = function (_ServiceBase) {
    _inherits(CrudService, _ServiceBase);

    function CrudService(Model, options) {
      _classCallCheck(this, CrudService);

      var _this = _possibleConstructorReturn(this, _ServiceBase.call(this));

      _this.Model = Model;
      _this.endpoints = {
        singular: options.singular,
        plural: options.plural
      };
      return _this;
    }

    CrudService.prototype.read = function read(identifier) {
      var url = !!identifier ? this.endpoints.singular + '/' + identifier : this.endpoints.singular;
      return this._fetch(url);
    };

    CrudService.prototype.list = function list(options) {
      var url = this.endpoints.plural;
      var query = [];

      if (!!options) {
        if (!!options.order) query.push("sort=" + options.order);
        if (!!options.offset || options.offset !== undefined) {
          if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
          query.push("offset=" + +options.offset);
        }

        if (!!options.limit) {
          if (!Number.isFinite(+options.offset)) throw new Error('invalid offset: ', options.offset);
          query.push("count=" + +options.limit);
        }

        if (!!options.q) query.push("q=" + options.q);

        Object.keys(options).filter(function (key) {
          return key !== 'order' && key !== 'offset' && key !== 'limit' && key !== 'q';
        }).forEach(function (option) {
          var value = Array.isArray(options[option]) ? options[option].join(',') : options[option];
          query.push(option + '=' + value);
        });
      }

      if (query.length) url = url + "?" + query.join('&');
      return this._fetch(url);
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
          console.log(err);return response;
        });
      });
    };

    return CrudService;
  }(_serviceBase.ServiceBase);
});