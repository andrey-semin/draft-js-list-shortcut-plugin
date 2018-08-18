import { RichUtils } from 'draft-js';
import createMultilineListItemPlugin from '../index';

const plugin = createMultilineListItemPlugin();
RichUtils.insertSoftNewline = jest.fn();
const state = {
  setEditorState: jest.fn()
};

const createEvent = (shiftKey = false) => {
  const event = new CustomEvent('keydown');
  event.which = 13;
  event.shiftKey = shiftKey;
  event.getModifierState = midifierName => {
    if (midifierName === 'Shift') {
      return event.shiftKey;
    }
    return false;
  };

  return event;
};

describe('draft-js-multiline-list-item', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return `handled` and insert soft newline', () => {
    const event = createEvent(true);
    const result = plugin.handleReturn(event, {}, state);
    expect(result).toEqual('handled');
    expect(RichUtils.insertSoftNewline).toHaveBeenCalled();
    expect(state.setEditorState).toHaveBeenCalled();
  });

  it('should return `not-handled` and insert soft newline', () => {
    const event = createEvent(false);
    const result = plugin.handleReturn(event, {}, state);
    expect(result).toEqual('not-handled');
    expect(RichUtils.insertSoftNewline).not.toHaveBeenCalled();
    expect(state.setEditorState).not.toHaveBeenCalled();
  });
});
