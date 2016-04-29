define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.baseUrl = baseUrl;
  function baseUrl() {
    return window.location.hostname === 'localhost' ? 'http://' + location.hostname + ':3000' : 'http://' + location.host;
  }
});