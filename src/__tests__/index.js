import { EditorState, convertFromRaw } from 'draft-js';
import createListShortcutPlugin from '../index';
import {
  START_UNORDERED_LIST_COMMAND,
  START_ORDERED_LIST_COMMAND,
  STAR_KEY,
  SPACE_KEY,
  ONE_KEY,
  DOT_KEY
} from '../contants';
import * as shouldStartListMock from '../utils/shouldStartList';
import * as startListMock from '../utils/startList';
import * as insertSpaceMock from '../utils/insertSpace';

const plugin = createListShortcutPlugin();
const createKeyboardEvent = key =>
  new KeyboardEvent('keydown', {
    key
  });

const store = {
  setEditorState: jest.fn(),
  getEditorState: jest.fn()
};

const rawContentState = {
  entityMap: {},
  blocks: [
    {
      key: 'item1',
      text: '',
      type: 'unstyled',
      depth: 0
    }
  ]
};

describe('draft-js-list-shortcut-plugin', () => {
  describe('keyBindingFn', () => {
    it('should return null for non-space key', () => {
      const event = createKeyboardEvent(STAR_KEY);
      const result = plugin.keyBindingFn(event);

      expect(result).toBeNull();
    });

    it(`should return ${START_UNORDERED_LIST_COMMAND} for * + Space keys`, () => {
      const event1 = createKeyboardEvent(STAR_KEY);
      plugin.keyBindingFn(event1);
      const event2 = createKeyboardEvent(SPACE_KEY);
      const result = plugin.keyBindingFn(event2);

      expect(result).toEqual(START_UNORDERED_LIST_COMMAND);
    });

    it(`should return ${START_ORDERED_LIST_COMMAND} for * + Space keys`, () => {
      const event1 = createKeyboardEvent(ONE_KEY);
      plugin.keyBindingFn(event1);
      const event2 = createKeyboardEvent(DOT_KEY);
      plugin.keyBindingFn(event2);
      const event3 = createKeyboardEvent(SPACE_KEY);
      const result = plugin.keyBindingFn(event3);

      expect(result).toEqual(START_ORDERED_LIST_COMMAND);
    });
  });

  describe('handleKeyCommand', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return `not-handled` for not custom list command', () => {
      const editorState = EditorState.createWithContent(
        convertFromRaw(rawContentState)
      );

      const result = plugin.handleKeyCommand(
        'some_command',
        editorState,
        store
      );

      expect(result).toEqual('not-handled');
      expect(store.setEditorState).not.toHaveBeenCalled();
    });

    it('should return `handled` and start unordered list', () => {
      const editorState = EditorState.createWithContent(
        convertFromRaw(rawContentState)
      );
      shouldStartListMock.default = jest.fn(() => true);
      startListMock.default = jest.fn();
      const result = plugin.handleKeyCommand(
        START_UNORDERED_LIST_COMMAND,
        editorState,
        store
      );

      expect(startListMock.default).toHaveBeenCalled();
      expect(store.setEditorState).toHaveBeenCalled();
      expect(result).toEqual('handled');
    });

    it('should return `handled` and start ordered list', () => {
      const editorState = EditorState.createWithContent(
        convertFromRaw(rawContentState)
      );
      shouldStartListMock.default = jest.fn(() => true);
      startListMock.default = jest.fn();
      const result = plugin.handleKeyCommand(
        START_ORDERED_LIST_COMMAND,
        editorState,
        store
      );

      expect(startListMock.default).toHaveBeenCalled();
      expect(store.setEditorState).toHaveBeenCalled();
      expect(result).toEqual('handled');
    });

    it('should return `handled` and insert space', () => {
      const editorState = EditorState.createWithContent(
        convertFromRaw(rawContentState)
      );
      shouldStartListMock.default = jest.fn(() => false);
      insertSpaceMock.default = jest.fn();
      const result = plugin.handleKeyCommand(
        START_ORDERED_LIST_COMMAND,
        editorState,
        store
      );

      expect(insertSpaceMock.default).toHaveBeenCalled();
      expect(store.setEditorState).toHaveBeenCalled();
      expect(result).toEqual('handled');
    });
  });
});
