export default editorState => {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();

  return content.getBlockMap().get(selection.getStartKey());
};
