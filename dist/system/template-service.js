'use strict';

System.register(['./crud-service'], function (_export, _context) {
  var CrudService, TemplateModel, TemplateService;

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
      TemplateModel = function TemplateModel(data, http) {
        _classCallCheck(this, TemplateModel);

        Object.assign(this, data);
      };

      _export('TemplateService', TemplateService = function (_CrudService) {
        _inherits(TemplateService, _CrudService);

        function TemplateService() {
          _classCallCheck(this, TemplateService);

          return _possibleConstructorReturn(this, _CrudService.call(this, TemplateModel, { singular: 'template', plural: 'templates' }));
        }

        return TemplateService;
      }(CrudService));

      _export('TemplateService', TemplateService);
    }
  };
});