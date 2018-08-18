import { RichUtils } from 'draft-js';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';

export default () => ({
  handleReturn: (event, editorState, { setEditorState }) => {
    if (isSoftNewlineEvent(event)) {
      setEditorState(RichUtils.insertSoftNewline(editorState));
      return 'handled';
    }
    return 'not-handled';
  }
});
