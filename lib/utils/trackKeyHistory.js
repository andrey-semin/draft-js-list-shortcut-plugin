'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var history = [];

exports.default = function (e) {
  var key = e.key;


  if (history.length > 2) {
    history = history.slice(1);
  }

  if (!_draftJs.KeyBindingUtil.hasCommandModifier(e)) {
    history.push(key);
  }

  return history;
};