import { getDefaultKeyBinding } from 'draft-js';
import {
  createTrackKeyHistory,
  getSelectedBlock,
  startList,
  insertSpace,
  shouldStartList
} from './utils';
import {
  SPACE_KEY,
  START_UNORDERED_LIST_COMMAND,
  START_ORDERED_LIST_COMMAND
} from './contants';

const trackKeyHistory = createTrackKeyHistory();

export default () => ({
  keyBindingFn: event => {
    const charHistory = trackKeyHistory(event);

    if (event.key === SPACE_KEY) {
      const previousChar = charHistory[charHistory.length - 2];

      if (previousChar === '*') {
        return START_UNORDERED_LIST_COMMAND;
      }

      const previousInput = charHistory.slice(0, 2).join('');
      if (previousInput === '1.') {
        return START_ORDERED_LIST_COMMAND;
      }
    }

    return getDefaultKeyBinding(event);
  },
  handleKeyCommand: (command, editorState, { setEditorState }) => {
    if (
      command === START_UNORDERED_LIST_COMMAND ||
      command === START_ORDERED_LIST_COMMAND
    ) {
      const block = getSelectedBlock(editorState);

      if (shouldStartList(block)) {
        const newEditorState = startList(editorState, block, command);

        setEditorState(newEditorState);
        return 'handled';
      }

      // Process normal space press
      const newEditorState = insertSpace(editorState);

      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  }
});
