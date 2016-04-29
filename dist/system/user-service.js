'use strict';

System.register(['./crud-service'], function (_export, _context) {
  var CrudService, UserModel, UserService;

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
    }],
    execute: function () {
      UserModel = function UserModel(data, http) {
        _classCallCheck(this, UserModel);

        Object.assign(this, data);
      };

      _export('UserService', UserService = function (_CrudService) {
        _inherits(UserService, _CrudService);

        function UserService() {
          _classCallCheck(this, UserService);

          return _possibleConstructorReturn(this, _CrudService.call(this, UserModel, { singular: 'user', plural: 'users' }));
        }

        return UserService;
      }(CrudService));

      _export('UserService', UserService);
    }
  };
});