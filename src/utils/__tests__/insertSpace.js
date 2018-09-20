import { EditorState, convertFromRaw } from 'draft-js';
import insertSpace from '../insertSpace';

const getFirstBlock = editorState => {
  const contentState = editorState.getCurrentContent();
  return contentState.getFirstBlock();
};

const buildRawContentStateObject = (text, type) => ({
  entityMap: {},
  blocks: [
    {
      key: 'item1',
      text,
      type,
      depth: 0
    }
  ]
});

describe('utils/insertSpace', () => {
  it('should return false for not unstyled block', () => {
    const text = 'Some text';
    const rawContentState = buildRawContentStateObject(text, 'unstyled');
    let editorState = EditorState.createWithContent(
      convertFromRaw(rawContentState)
    );
    editorState = EditorState.moveFocusToEnd(editorState);
    editorState = insertSpace(editorState);

    const block = getFirstBlock(editorState);
    expect(block.getText().length).toEqual(text.length + 1);
    expect(block.getText()).toEqual(`${text} `);
  });
});
