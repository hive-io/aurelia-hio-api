'use strict';

System.register([], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      function baseUrl() {
        return window.location.hostname === 'localhost' ? 'http://' + location.hostname + ':3000' : 'http://' + location.host;
      }

      _export('baseUrl', baseUrl);
    }
  };
});