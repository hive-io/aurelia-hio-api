define(['exports', './crud-service'], function (exports, _crudService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.QueueService = undefined;

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

  var QueueModel = function QueueModel(data, http) {
    _classCallCheck(this, QueueModel);

    Object.assign(this, data);
    this.http = http;
  };

  var QueueService = exports.QueueService = function (_CrudService) {
    _inherits(QueueService, _CrudService);

    function QueueService() {
      _classCallCheck(this, QueueService);

      return _possibleConstructorReturn(this, _CrudService.call(this, QueueModel, { singular: 'bus/queue', plural: 'bus/queue' }));
    }

    return QueueService;
  }(_crudService.CrudService);
});