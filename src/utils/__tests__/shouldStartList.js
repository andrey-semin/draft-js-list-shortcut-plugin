import { EditorState, convertFromRaw } from 'draft-js';
import shouldStartList from '../shouldStartList';

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

describe('utils/shouldStartList', () => {
  it('should return false for not unstyled block', () => {
    const rawContentState = buildRawContentStateObject(
      '*',
      'unordered-list-item',
      0
    );
    const editorState = EditorState.createWithContent(
      convertFromRaw(rawContentState)
    );

    const block = getFirstBlock(editorState);
    const result = shouldStartList(block);

    expect(result).toBeFalsy;
  });

  it('should return false for block with depth more than 0', () => {
    const rawContentState = buildRawContentStateObject(
      '*',
      'unordered-list-item',
      1
    );
    const editorState = EditorState.createWithContent(
      convertFromRaw(rawContentState)
    );

    const block = getFirstBlock(editorState);
    const result = shouldStartList(block);

    expect(result).toBeFalsy;
  });

  it('should return false for unstyled block with 0 depth and any other text', () => {
    const rawContentState = buildRawContentStateObject(
      'any text',
      'unstyled',
      0
    );
    const editorState = EditorState.createWithContent(
      convertFromRaw(rawContentState)
    );

    const block = getFirstBlock(editorState);
    const result = shouldStartList(block);

    expect(result).toBeFalsy;
  });

  it('should return true for unordered list case', () => {
    const rawContentState = buildRawContentStateObject('*', 'unstyled', 0);
    const editorState = EditorState.createWithContent(
      convertFromRaw(rawContentState)
    );

    const block = getFirstBlock(editorState);
    const result = shouldStartList(block);

    expect(result).toBeTruthy;
  });

  it('should return true for ordered list case', () => {
    const rawContentState = buildRawContentStateObject('1.', 'unstyled', 0);
    const editorState = EditorState.createWithContent(
      convertFromRaw(rawContentState)
    );

    const block = getFirstBlock(editorState);
    const result = shouldStartList(block);

    expect(result).toBeTruthy;
  });
});
