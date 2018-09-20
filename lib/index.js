'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _trackKeyHistory = require('./utils/trackKeyHistory');

var _trackKeyHistory2 = _interopRequireDefault(_trackKeyHistory);

var _getSelectedBlock = require('./utils/getSelectedBlock');

var _getSelectedBlock2 = _interopRequireDefault(_getSelectedBlock);

var _startList = require('./utils/startList');

var _startList2 = _interopRequireDefault(_startList);

var _insertSpace = require('./utils/insertSpace');

var _insertSpace2 = _interopRequireDefault(_insertSpace);

var _shouldStartList = require('./utils/shouldStartList');

var _shouldStartList2 = _interopRequireDefault(_shouldStartList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPACE = 32;

exports.default = function () {
  return {
    keyBindingFn: function keyBindingFn(event) {
      var charHistory = (0, _trackKeyHistory2.default)(event);

      if (event.keyCode === SPACE) {
        // char on 2nd place

        var previousChar = charHistory[charHistory.length - 2];
        if (previousChar === '*') {
          return 'start-unordered-list';
        }

        var previousInput = charHistory.slice(0, 2).join('');
        if (previousInput === '1.') {
          return 'start-ordered-list';
        }
      }

      return (0, _draftJs.getDefaultKeyBinding)(event);
    },
    handleKeyCommand: function handleKeyCommand(command, editorState, _ref) {
      var setEditorState = _ref.setEditorState;

      if (command === 'start-unordered-list' || command === 'start-ordered-list') {
        var block = (0, _getSelectedBlock2.default)(editorState);

        if ((0, _shouldStartList2.default)(block)) {
          var _newEditorState = (0, _startList2.default)(editorState, block, command);

          setEditorState(_newEditorState);
          return 'handled';
        }

        // Process normal space press here
        var newEditorState = (0, _insertSpace2.default)(editorState);

        setEditorState(newEditorState);
        return 'handled';
      }

      return 'not-handled';
    }
  };
};