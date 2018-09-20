'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var listTypeMap = {
  'start-unordered-list': 'unordered-list-item',
  'start-ordered-list': 'ordered-list-item'
};

exports.default = function (editorState, block, command) {
  var listType = listTypeMap[command];
  var newEditorState = _draftJs.RichUtils.toggleBlockType(editorState, listType);
  var contentState = newEditorState.getCurrentContent();
  var selection = newEditorState.getSelection();

  var blockSelection = selection.merge({
    anchorOffset: 0,
    focusOffset: block.getLength()
  });

  var newContentState = _draftJs.Modifier.replaceText(contentState, blockSelection, '');

  return _draftJs.EditorState.push(newEditorState, newContentState);
};