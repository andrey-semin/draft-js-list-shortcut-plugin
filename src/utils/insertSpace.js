import { Modifier, EditorState } from 'draft-js';

export default editorState => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const newContent = Modifier.insertText(contentState, selection, ' ');

  return EditorState.push(editorState, newContent);
};
