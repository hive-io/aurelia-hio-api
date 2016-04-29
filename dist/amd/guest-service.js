define(['exports', './crud-service'], function (exports, _crudService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GuestService = undefined;

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

  var GuestModel = function GuestModel(data, http) {
    var _this = this;

    _classCallCheck(this, GuestModel);

    Object.assign(this, data);
    if (!this.hasOwnProperty('diskinfo')) {
      this.diskinfo = [{ diskUsage: 0, diskSize: 1 }];
    }

    ['reset', 'suspend', 'resume', 'poweroff', 'poweron', 'undefine', 'reboot', 'shutdown'].map(function (action) {
      var self = _this;
      _this[action] = function () {
        console.log('called: ', action);
        console.log('   => ', 'guest/' + self.name + '/' + action);
        return http.fetch('guest/' + self.name + '/' + action, { method: 'POST' });
      };
    });
  };

  var GuestService = exports.GuestService = function (_CrudService) {
    _inherits(GuestService, _CrudService);

    function GuestService() {
      _classCallCheck(this, GuestService);

      return _possibleConstructorReturn(this, _CrudService.call(this, GuestModel, { singular: 'guest', plural: 'guests' }));
    }

    return GuestService;
  }(_crudService.CrudService);
});