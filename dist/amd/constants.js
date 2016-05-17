define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.baseUrl = baseUrl;
  function baseUrl() {
    var location = window.location;
    return location.hostname === 'localhost' ? location.protocol + '//' + location.hostname + ':3000' : location.protocol + '//' + location.host;
  }
});