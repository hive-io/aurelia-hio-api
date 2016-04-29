'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostService = undefined;

var _crudService = require('./crud-service');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HostModel = function HostModel(data, http) {
  _classCallCheck(this, HostModel);

  Object.assign(this, data);

  this.hardware = this.hardware || {};
  this.hardware.bios = this.hardware.bios || {};
  this.hardware.bios.vendor = this.hardware.bios.vendor || 'Not Specified';
};

var HostService = exports.HostService = function (_CrudService) {
  _inherits(HostService, _CrudService);

  function HostService() {
    _classCallCheck(this, HostService);

    return _possibleConstructorReturn(this, _CrudService.call(this, HostModel, { singular: 'host', plural: 'hosts' }));
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
}(_crudService.CrudService);