import { EditorState, convertFromRaw } from 'draft-js';
import startList from '../startList';

const getFirstBlock = editorState => {
  const contentState = editorState.getCurrentContent();
  return contentState.getFirstBlock();
};

const buildRawContentStateObject = (text, type, depth) => ({
  entityMap: {},
  blocks: [
    {
      key: 'item1',
      text,
      type,
      depth
    }
  ]
});

describe('utils/startList', () => {
  it('should change block to unordered-list-item', () => {
    const rawContentState = buildRawContentStateObject(
      'some text',
      'unstyled',
      0
    );
    const editorState = EditorState.createWithContent(
      convertFromRaw(rawContentState)
    );

    const command = 'start-unordered-list';
    const block = getFirstBlock(editorState);
    const editorStateWithList = startList(editorState, block, command);
    const updatedBlock = getFirstBlock(editorStateWithList);

    expect(updatedBlock.getType()).toEqual('unordered-list-item');
    expect(updatedBlock.getText()).toHaveLength(0);
  });

  it('should change block to ordered-list-item', () => {
    const rawContentState = buildRawContentStateObject(
      'some text',
      'unstyled',
      0
    );
    const editorState = EditorState.createWithContent(
      convertFromRaw(rawContentState)
    );

    const command = 'start-ordered-list';
    const block = getFirstBlock(editorState);
    const editorStateWithList = startList(editorState, block, command);
    const updatedBlock = getFirstBlock(editorStateWithList);

    expect(updatedBlock.getType()).toEqual('ordered-list-item');
    expect(updatedBlock.getText()).toHaveLength(0);
  });
});
