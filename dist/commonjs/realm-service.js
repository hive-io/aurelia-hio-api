'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RealmService = undefined;

var _crudService = require('./crud-service');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RealmModel = function RealmModel(data, http) {
  _classCallCheck(this, RealmModel);

  Object.assign(this, data);
};

var RealmService = exports.RealmService = function (_CrudService) {
  _inherits(RealmService, _CrudService);

  function RealmService() {
    _classCallCheck(this, RealmService);

    return _possibleConstructorReturn(this, _CrudService.call(this, RealmModel, { singular: 'realm', plural: 'realms' }));
  }

  return RealmService;
}(_crudService.CrudService);