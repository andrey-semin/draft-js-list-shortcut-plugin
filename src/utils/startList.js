import { RichUtils, Modifier, EditorState } from 'draft-js';

const listTypeMap = {
  'start-unordered-list': 'unordered-list-item',
  'start-ordered-list': 'ordered-list-item'
};

export default (editorState, block, command) => {
  const listType = listTypeMap[command];
  const newEditorState = RichUtils.toggleBlockType(editorState, listType);
  const contentState = newEditorState.getCurrentContent();
  const selection = newEditorState.getSelection();

  const blockSelection = selection.merge({
    anchorOffset: 0,
    focusOffset: block.getLength()
  });

  const newContentState = Modifier.replaceText(
    contentState,
    blockSelection,
    ''
  );

  return EditorState.push(newEditorState, newContentState);
};
