"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (editorState) {
  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();

  return content.getBlockMap().get(selection.getStartKey());
};