'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (block) {
  return block.getType() === 'unstyled' && block.getDepth() === 0 && (block.getText() === '*' || block.getText() === '1.');
};