'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

exports.default = function (editorState) {
  var contentState = editorState.getCurrentContent();
  var selection = editorState.getSelection();
  var newContent = _draftJs.Modifier.insertText(contentState, selection, ' ');

  return _draftJs.EditorState.push(editorState, newContent);
};