'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _utils = require('./utils');

var _contants = require('./contants');

var trackKeyHistory = (0, _utils.createTrackKeyHistory)();

exports.default = function () {
  return {
    keyBindingFn: function keyBindingFn(event) {
      var charHistory = trackKeyHistory(event);

      if (event.key === _contants.SPACE_KEY) {
        var previousChar = charHistory[charHistory.length - 2];

        if (previousChar === '*') {
          return _contants.START_UNORDERED_LIST_COMMAND;
        }

        var previousInput = charHistory.slice(0, 2).join('');
        if (previousInput === '1.') {
          return _contants.START_ORDERED_LIST_COMMAND;
        }
      }

      return (0, _draftJs.getDefaultKeyBinding)(event);
    },
    handleKeyCommand: function handleKeyCommand(command, editorState, _ref) {
      var setEditorState = _ref.setEditorState;

      if (command === _contants.START_UNORDERED_LIST_COMMAND || command === _contants.START_ORDERED_LIST_COMMAND) {
        var block = (0, _utils.getSelectedBlock)(editorState);

        if ((0, _utils.shouldStartList)(block)) {
          var _newEditorState = (0, _utils.startList)(editorState, block, command);

          setEditorState(_newEditorState);
          return 'handled';
        }

        // Process normal space press
        var newEditorState = (0, _utils.insertSpace)(editorState);

        setEditorState(newEditorState);
        return 'handled';
      }

      return 'not-handled';
    }
  };
};