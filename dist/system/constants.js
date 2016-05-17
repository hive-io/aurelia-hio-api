'use strict';

System.register([], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      function baseUrl() {
        var location = window.location;
        return location.hostname === 'localhost' ? location.protocol + '//' + location.hostname + ':3000' : location.protocol + '//' + location.host;
      }

      _export('baseUrl', baseUrl);
    }
  };
});