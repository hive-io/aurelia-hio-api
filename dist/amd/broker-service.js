define(['exports', './crud-service'], function (exports, _crudService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BrokerService = undefined;

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

  var BrokerModel = function BrokerModel(data) {
    _classCallCheck(this, BrokerModel);

    Object.assign(this, data);
  };

  var BrokerService = exports.BrokerService = function (_CrudService) {
    _inherits(BrokerService, _CrudService);

    function BrokerService() {
      _classCallCheck(this, BrokerService);

      return _possibleConstructorReturn(this, _CrudService.call(this, BrokerModel, { singular: 'bus', plural: 'bus' }));
    }

    return BrokerService;
  }(_crudService.CrudService);
});